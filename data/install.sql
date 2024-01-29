CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at timestamptz,
    uuid UUID UNIQUE NOT NULL
);

CREATE TABLE covers (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    img_description TEXT,
    img_size VARCHAR(255),
    img_url TEXT,
    llm_name VARCHAR(100),
    llm_params JSON,
    created_at timestamptz,
    uuid UUID UNIQUE NOT NULL,
    status INT,
    is_recommended BOOLEAN
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamptz,
    user_email VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    plan VARCHAR(50),
    expired_at timestamptz,
    order_status SMALLINT NOT NULL,
    paied_at timestamptz,
    stripe_session_id VARCHAR(255),
    credits INT NOT NULL,
    currency VARCHAR(50)
);