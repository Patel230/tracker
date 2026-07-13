-- Session JWTs were stateless, so changing your password rehashed the secret
-- but left every already-issued cookie valid for its full 30-day life. A
-- stolen session survived the exact action taken to revoke it.
--
-- token_version is embedded in each JWT and compared on every authenticated
-- request. Bumping it invalidates all outstanding sessions for that user.
ALTER TABLE users ADD COLUMN token_version INTEGER NOT NULL DEFAULT 0;
