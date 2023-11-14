import { render, screen } from '@testing-library/react';
import ValidationError from './ValidationError';

describe('ValidationError', () => {
    //(12)
    test('given value has not changed, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={false}
            testId='error'
            type='email'
            value='anyValue'
        />);
        expect(screen.queryByTestId('error')).toBeNull();
    })

    //(13)
    test('given value is mandatory, when value is empty, then return error', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='required'
            value=''
        />);
        expect(screen.getByTestId('error')).not.toBeNull();
    })

    //(14)
    test('given value is mandatory, when value is not empty, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='required'
            value='anyValue'
        />);
        expect(screen.queryByTestId('error')).toBeNull();
    })

    //(15)
    test('given error is email, when value is invalid, then return error', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='email'
            value='invalid'
        />);
        expect(screen.getByTestId('error')).not.toBeNull();
    })

    //(16)
    test('given error is email, when value is valid, then return null', () => {
        render(<ValidationError
            errorMessage='anyErrorMessage'
            hasChanged={true}
            testId='error'
            type='email'
            value='valid@email.com'
        />);
        expect(screen.queryByTestId('error')).toBeNull();
    })
    
})