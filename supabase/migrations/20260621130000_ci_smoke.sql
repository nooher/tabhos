-- Smoke test: re-asserts that migrations CI can apply files end-to-end.
-- No-op idempotent select that returns 1 column 1 row.
select 1 as ci_smoke;
