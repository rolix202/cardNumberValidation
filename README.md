# Card Number Validation API

A simple REST API endpoint for validating credit card numbers using the Luhn algorithm, with a built-in web interface for easy testing.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript (with strict mode enabled)
- **Framework**: Express.js
- **Testing**: Jest with Supertest for integration tests
- **Development**: Nodemon for hot reloading
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cardNumberValidation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot reloading using nodemon and ts-node.

### Production Mode
```bash
npm run build
npm start
```
The `build` command compiles TypeScript to JavaScript in the `dist/` directory, and `start` runs the compiled code.

## Web Interface

Once the server is running, visit `http://localhost:3000` in your browser to access the web interface. The interface provides:

- **Card Number Input**: Enter card numbers with automatic formatting
- **Real-time Validation**: Instant feedback with success/error messages
- **User-friendly Display**: Well-formatted results with appropriate styling
- **Test Examples**: Console logs with sample valid/invalid card numbers

### Features:
- Automatic card number formatting with spaces
- Loading states during validation
- Clear success/error messaging
- Responsive design for mobile and desktop
- No page refresh required (AJAX requests)

## API Usage

### Validate Card Number

**Endpoint**: `POST /api/v1/card/validate`

**Request Body**:
```json
{
  "cardNumber": "4532015112830366"
}
```

**Success Response** (200):
```json
{
  "valid": true,
  "message": "Card successfully validated",
}
```

**Error Response** (400):
```json
{
  "status": "error",
  "message": "Invalid card details"
}
```

## Validation Rules

The API validates card numbers using the following rules:

1. **Presence**: Card number must be provided
2. **Type**: Must be a string
3. **Format**: Only digits allowed (spaces and hyphens are automatically removed)
4. **Length**: Must be between 13-19 digits
5. **Algorithm**: Uses the Luhn algorithm for mathematical validation

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

The test suite includes:
- Unit tests for the validation algorithm
- Integration tests for the API endpoint
- Tests for error handling and input validation

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts               # Server entry point
├── controllers/
│   └── card.controllers.ts # Request handlers
├── middleware/
│   ├── card.validation.ts  # Input validation middleware
│   ├── errorHandler.ts     # Global error handling
│   └── notFound.ts         # 404 handler
├── routes/
│   └── card.routes.ts      # Route definitions
├── services/
│   └── cardFuncValidator.ts # Luhn algorithm implementation
├── types/                  # TypeScript type definitions
└── errors/
    └── AppError.ts         # Custom error class

tests/
├── unit/                   # Unit tests
└── integration/            # Integration tests
```

## Design Decisions

### Framework Choice
- **Express.js** over NestJS: For a simple single-endpoint API, Express.js provides sufficient functionality without the overhead of a full framework like NestJS. It allows for a lightweight, straightforward implementation.

### Validation Algorithm
- **Luhn Algorithm**: This is the industry-standard algorithm for validating credit card numbers. It performs a mathematical check to ensure the number follows the correct pattern, though it doesn't verify if the card actually exists or is active.

### Input Validation
- Comprehensive middleware validation ensures clean, sanitized input before processing.
- Automatic removal of spaces and hyphens for user convenience.
- Strict type checking and length validation prevent malformed requests.

### Error Handling
- Custom `AppError` class for consistent error responses.
- Global error handler differentiates between custom errors and unexpected server errors.
- Graceful handling of unhandled rejections and exceptions to prevent server crashes.

### Testing Strategy
- **Unit Tests**: Test the core validation logic in isolation.
- **Integration Tests**: Test the full request-response cycle.
- Both types ensure reliability and catch regressions.

### TypeScript Configuration
- `strict: true` ensures type safety and catches potential runtime errors at compile time.
- CommonJS modules for compatibility with existing Node.js tooling.

### Environment Configuration
- Uses `dotenv` for environment variables, allowing easy configuration of port and environment mode.
- Defaults provided for development convenience.

### Code Organization
- MVC-inspired structure separates concerns: routes for endpoints, controllers for logic, services for business rules.
- Middleware pattern for cross-cutting concerns like validation and error handling.

## API Response Format

The API returns JSON responses with consistent structure:
- Success: `{ valid: true, message: string, cardNumber: string }`
- Error: `{ status: "error", message: string }`

HTTP status codes:
- 200: Valid card number
- 400: Invalid input or invalid card number
- 404: Route not found
- 500: Server error

## Development Notes

- The server includes proper shutdown handling for unhandled rejections and exceptions.
- In development mode, error responses include stack traces for debugging.
- The root endpoint (`/`) provides a simple welcome message for basic health checks.