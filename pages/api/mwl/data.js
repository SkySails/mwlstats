import axios from "axios";
import qs from "qs";

async function callAPIWithParams(params, cred) {
  let config = {
    method: "post",
    url: "https://api.myweblog.se/api_mobile.php?version=2.0.3",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "mwl_cookie_language=se",
    },
    data: qs.stringify({
      app_token: "uuJH6tY3122t541!!MAHA!",
      mwl_u: cred.mwl_u,
      mwl_p: cred.mwl_p,
      myflights: "1",
      returnType: "JSON",
      limit: "9999",
      ...params,
    }),
  };

  let response = await axios(config)
    .then((response) => response.data)
    .catch((err) => err);

  return response.result || response;
}

async function fetchDataWithCredentials(cred) {
  let [transactions, logs] = await axios
    .all([
      callAPIWithParams({ qtype: "GetTransactions" }, cred),
      callAPIWithParams(
        {
          qtype: "GetFlightLogReversed",
        },
        cred
      ),
    ])
    .then((resArr) => [resArr[0], resArr[1]]);

  return {
    error: transactions.Error || logs.Error || undefined,
    transactions,
    logs,
  };
}

function parseTransactions(rawTransactions) {
  let {
    Balance,
    currency_symbol,
    int_curr_symbol,
    Transaction: Transactions,
  } = rawTransactions;

  let data = Transactions.reduce(
    (acc, transaction) => {
      if (transaction.belopp.startsWith("-")) {
        acc.totalExpenses += Math.abs(parseFloat(transaction.belopp));
      }
      if (transaction.comment.match(/SE-\w\w\w/)) {
        const regnr = transaction.comment.match(/SE-\w\w\w/)[0];
        if (acc.aircraft[regnr]) {
          acc.aircraft[regnr].expenses += Math.abs(
            parseInt(transaction.belopp)
          );
        } else {
          acc.aircraft[regnr] = {
            expenses: Math.abs(parseInt(transaction.belopp)),
          };
        }
      }
      return acc;
    },
    { totalExpenses: 0, aircraft: {} }
  );

  return {
    balance: parseFloat(Balance),
    currency_symbol,
    int_curr_symbol,
    expenses: data,
  };
}

function parseFlightLogs(FlightLogs) {
  let totalFlights = FlightLogs.length - 1;

  let data = FlightLogs.reduce(
    (accData, log) => {
      accData.totalHours += parseFloat(log.airborne_total); // Add log hours to the grand total, "totalHours"

      // Get destination from log and add to list of visited airports, "destinations"
      let destinations = (accData["destinations"] =
        accData["destinations"] || {});
      destinations = destinations[log.arrival] =
        destinations[log.arrival] || {};
      destinations.visits = destinations.visits + 1 || 1;
      destinations.last_visit = log.flight_datum;

      // Get aircraft registration and add or update its entry in a list of aircraft, "aircraft"
      let aircraft = (accData["aircraft"] = accData["aircraft"] || {});
      aircraft = aircraft[log.regnr] = aircraft[log.regnr] || {};
      aircraft.flights = aircraft.flights + 1 || 1;
      aircraft.last_flight = log.flight_datum;
      aircraft.airborne_time =
        aircraft.airborne_time + parseFloat(log.airborne_total) ||
        parseFloat(log.airborne_total);

      aircraft.avg_tach =
        (aircraft.avg_tach + parseFloat(log.tach_total)) / 2 ||
        parseFloat(log.tach_total) ||
        undefined;

      aircraft.avg_money_ratio =
        (aircraft.avg_money_ratio + log.money_ratio) / 2 || log.money_ratio;

      return accData;
    },
    {
      totalHours: 0,
      destinations: {},
      aircraft: {},
    }
  );

  data.aircraft._favourite = function (object) {
    let reg = Object.keys(this).reduce((a, b) =>
      !this[b].flights || this[a].flights > this[b].flights ? a : b
    );
    return {
      reg,
      ...this[reg],
    };
  };

  return {
    totalFlights,
    ...data,
  };
}

const free_types = ["brand", "service"];

function mergeTransactionsAndFlightLogs(transactions, flightLogs) {
  transactions = [
    ...transactions.filter((transaction) =>
      transaction.comment.match(/SE-\w\w\w/)
    ),
  ];

  let newLogs = flightLogs.map((log) => {
    if (
      free_types.some((type) => log.nature_beskr.toLowerCase().includes(type))
    ) {
      // Is a free type, should not check transactions
      return log;
    } else {
      // Is not a free type, check for corresponding transaction
      let corrTransaction = transactions.find(
        (transaction) => transaction.datum === log.flight_datum
      );

      let money = parseFloat(corrTransaction?.belopp);
      log.money = money || "N/A";
      log.money_ratio = Math.abs(money) / log.airborne_total || undefined;
      log.tach_ratio =
        parseFloat(log.airborne_total) / parseFloat(log.tach_total);

      transactions.splice(transactions.indexOf(corrTransaction), 1);
      return log;
    }
  });
  return newLogs;
}

export default async (req, res) => {
  let { mwl_u, mwl_p } = req.body;

  if ((!mwl_u || !mwl_u) && req.headers.authorization) {
    [mwl_u, mwl_p] = Buffer.from(
      req.headers.authorization.split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");
  }

  if (!mwl_u || !mwl_p) {
    return res.status(401).json({
      status: 401,
      message: "Forbidden. Missing credentials?",
    });
  }

  // Get raw data from API
  let { transactions, logs, error } = await fetchDataWithCredentials({
    mwl_u,
    mwl_p,
  });

  if (error) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized. Invalid credentials?",
      error,
    });
  }

  // Merge transactions with logs
  let mergedLogs = mergeTransactionsAndFlightLogs(
    transactions.Transaction,
    logs.FlightLog
  );

  // Parse transactions and flightlogs for data
  let economy = parseTransactions(transactions);
  let general = parseFlightLogs(mergedLogs);

  res.json({
    economy,
    general,
    logs: mergedLogs,
  });
};
