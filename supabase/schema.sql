-- CocoBongo Database Schema

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  table_type VARCHAR(50) NOT NULL CHECK (table_type IN ('standard', 'vip', 'ultra_vip')),
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  performer VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  tickets_available INTEGER DEFAULT 100,
  vip_available INTEGER DEFAULT 20,
  ticket_price DECIMAL(10, 2) DEFAULT 25.00,
  vip_price DECIMAL(10, 2) DEFAULT 50.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  type VARCHAR(50) NOT NULL CHECK (type IN ('photo', 'video')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_gallery_type ON gallery(type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON reservations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON gallery
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);

-- Insert sample data (optional)
INSERT INTO events (title, description, date, time, performer, image_url, tickets_available, vip_available, ticket_price, vip_price)
VALUES
  ('Summer Vibes Night', 'Experience the hottest summer party of the year', '2024-06-15', '22:00', 'DJ Luna & The Beats', 'https://via.placeholder.com/400x300', 100, 20, 25.00, 50.00),
  ('VIP Midnight Experience', 'Exclusive midnight party for our VIP members', '2024-06-22', '23:00', 'DJ Phoenix', 'https://via.placeholder.com/400x300', 80, 30, 30.00, 75.00),
  ('Electronic Dreams', 'The best electronic music experience in town', '2024-06-29', '21:00', 'DJ Nexus & Co', 'https://via.placeholder.com/400x300', 150, 25, 20.00, 45.00);
