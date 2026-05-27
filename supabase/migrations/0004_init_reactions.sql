CREATE TABLE IF NOT EXISTS reactions (
  id         UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id    UUID         NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  device_id  VARCHAR(64)  NOT NULL,
  created_at TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE (post_id, device_id)
);

CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
