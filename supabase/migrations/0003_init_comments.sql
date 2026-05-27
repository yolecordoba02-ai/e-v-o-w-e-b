CREATE TABLE IF NOT EXISTS comments (
  id           UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id      UUID         NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name  VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content      TEXT         NOT NULL CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 2000),
  is_featured  BOOLEAN      DEFAULT false,
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post     ON comments(post_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_featured ON comments(post_id, is_featured DESC, created_at DESC);
