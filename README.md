# API Service

**Note: This project is no longer actively maintained.**

## Configuration

This project uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the following variables:

### JWT
```
JWT_SECRET=your_jwt_secret
```

### Admin Credentials
```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password
```

### Mail Configuration
```
MAIL_HOST=your_mail_host
MAIL_USER=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_FROM=noreply@example.com
```

### PostgreSQL Database
```
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_DB=your_database_name
POSTGRES_USER=your_database_user
POSTGRES_PASSWORD=your_database_password
```

Replace the placeholder values with your actual configuration details.

## Important Notice

This project is no longer under active development. The code and configuration provided here are for reference purposes only. We recommend using up-to-date and actively maintained alternatives for any production use cases.
