CREATE TABLE IF NOT EXISTS posts (
  id              UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            VARCHAR(150) UNIQUE NOT NULL,
  title           VARCHAR(200) NOT NULL,
  era             VARCHAR(10)  NOT NULL CHECK (era IN ('web10', 'web20', 'general')),
  year            INTEGER      NOT NULL CHECK (year >= 1960 AND year <= 2030),
  excerpt         TEXT,
  content         TEXT         NOT NULL DEFAULT '',
  cover_image_url TEXT,
  status          VARCHAR(15)  NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published')),
  created_by      UUID         REFERENCES users(id) ON DELETE SET NULL,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ  DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug    ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_era     ON posts(era, status);
CREATE INDEX IF NOT EXISTS idx_posts_year    ON posts(year);
CREATE INDEX IF NOT EXISTS idx_posts_status  ON posts(status, published_at DESC);
