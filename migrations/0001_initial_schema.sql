-- users: represents people signing in
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- products: digital downloads or course access
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,         -- e.g., 'download' or 'course'
  stripe_price_id TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- entitlements: what products a user owns
CREATE TABLE IF NOT EXISTS entitlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  status TEXT NOT NULL,        -- 'active', 'revoked', etc.
  granted_at TEXT DEFAULT CURRENT_TIMESTAMP,
  stripe_event_id TEXT UNIQUE, -- idempotent for webhook events
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Optional: lesson records for online courses
CREATE TABLE IF NOT EXISTS course_lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  course_product_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,                -- lesson body/JSON
  media_r2_key TEXT,           -- optional R2 key to video/pdf
  FOREIGN KEY (course_product_id) REFERENCES products(id)
);
