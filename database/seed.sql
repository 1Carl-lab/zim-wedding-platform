-- Zimbabwe Wedding Platform - Sample Seed Data
-- This file contains sample data for development and testing

-- Note: Replace with actual data or remove before production

-- Sample users (passwords should be hashed in real implementation)
-- Password: 'password123' (this is just a placeholder)
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_verified) VALUES
('john.doe@example.com', '$2b$10$...', 'John', 'Doe', '+263771234567', 'customer', true),
('jane.smith@example.com', '$2b$10$...', 'Jane', 'Smith', '+263772345678', 'customer', true),
('vendor1@example.com', '$2b$10$...', 'Alice', 'Vendor', '+263773456789', 'vendor', true),
('vendor2@example.com', '$2b$10$...', 'Bob', 'Catering', '+263774567890', 'vendor', true);

-- Sample vendors
-- Note: Update user_id values based on actual inserted user IDs
-- INSERT INTO vendors (user_id, business_name, category, description, location, city, phone, email, price_range, is_verified, is_active, average_rating, total_reviews) VALUES
-- ('user-uuid-1', 'Dream Weddings Zimbabwe', 'planner', 'Full-service wedding planning for your special day', 'Harare', 'Harare', '+263771234567', 'info@dreamweddings.co.zw', '$$$', true, true, 4.8, 25),
-- ('user-uuid-2', 'Gourmet Catering Co.', 'caterer', 'Premium catering services for weddings and events', 'Bulawayo', 'Bulawayo', '+263772345678', 'info@gourmetcatering.co.zw', '$$', true, true, 4.6, 18);

-- Sample reviews
-- INSERT INTO reviews (vendor_id, user_id, rating, title, comment, is_verified) VALUES
-- ('vendor-uuid-1', 'user-uuid-1', 5, 'Excellent Service!', 'They made our wedding day perfect!', true),
-- ('vendor-uuid-2', 'user-uuid-2', 4, 'Great Food', 'The food was delicious and beautifully presented.', true);

-- Sample bookings
-- INSERT INTO bookings (vendor_id, user_id, event_date, status, message, total_amount, payment_status) VALUES
-- ('vendor-uuid-1', 'user-uuid-1', '2024-06-15', 'confirmed', 'Looking forward to working with you!', 2500.00, 'paid'),
-- ('vendor-uuid-2', 'user-uuid-2', '2024-07-20', 'pending', 'Please confirm availability', 1200.00, 'pending');

-- Note: This seed file uses placeholder UUIDs
-- In practice, you should use actual UUIDs generated from the inserted users and vendors
