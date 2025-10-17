-- Basic placeholders; replace with your real tables later.
CREATE TABLE IF NOT EXISTS spend_weeks (
  id INTEGER PRIMARY KEY,
  week TEXT NOT NULL,
  planned INTEGER NOT NULL,
  actual INTEGER NOT NULL,
  invoices INTEGER NOT NULL,
  payment_lag_days INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS vendors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  spend INTEGER NOT NULL,
  lag_days INTEGER NOT NULL
);
