#!/bin/bash

echo "Running Delaware DSA Website Test Suite"
echo "======================================="

echo "Running unit tests..."
npm test -- --coverage

echo "Running linting..."
npm run lint

echo "Running type checking..."
npm run type-check

echo "Running accessibility tests..."
npm test -- --testPathPattern="a11y"

echo "Running integration tests..."
npm test -- --testPathPattern="integration"

echo "Generating coverage report..."
npm test -- --coverage --coverageReporters=html

echo "Test suite complete!"
