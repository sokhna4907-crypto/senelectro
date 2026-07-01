-- Table admins
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table véhicules
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  km INTEGER NOT NULL,
  fuel VARCHAR(50) NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price BIGINT NOT NULL,
  monthly_price BIGINT,
  badge VARCHAR(50),
  description TEXT,
  photos JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table électroménager
CREATE TABLE IF NOT EXISTS appliances (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price BIGINT NOT NULL,
  stock_count INTEGER DEFAULT 0,
  description TEXT,
  photos JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table demandes financement
CREATE TABLE IF NOT EXISTS financing_requests (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  budget_monthly BIGINT NOT NULL,
  product_type VARCHAR(50),
  product_id INTEGER,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table messages contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin par défaut (mot de passe: admin123)
INSERT INTO admins (email, password_hash)
VALUES ('admin@senelectro.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4o9Fm7Bwy2')
ON CONFLICT (email) DO NOTHING;
