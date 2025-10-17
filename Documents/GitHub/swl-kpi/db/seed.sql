INSERT INTO spend_weeks (id, week, planned, actual, invoices, payment_lag_days) VALUES
(1, 'W1', 20000, 18000, 6, 9),
(2, 'W2', 20000, 22000, 7, 12),
(3, 'W3', 20000, 19500, 8, 7),
(4, 'W4', 20000, 24000, 9, 14),
(5, 'W5', 20000, 21000, 5, 10),
(6, 'W6', 20000, 20000, 6, 8);

INSERT INTO vendors (id, name, spend, lag_days) VALUES
(1, 'Millwork Co', 42000, 12),
(2, 'HVAC Ltd', 36000, 15),
(3, 'Electrical', 28000, 9),
(4, 'Plumbing', 19500, 11),
(5, 'Flooring', 13000, 7);
