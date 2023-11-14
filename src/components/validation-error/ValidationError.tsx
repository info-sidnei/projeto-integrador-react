import { isEmailValid } from './../../helpers/EmailHelper';
import './ValidationError.css';
import { isBefore, parseISO } from 'date-fns';

type ValidationErrorProps = {
    errorMessage: string;
    hasChanged: boolean;
    type: 'required' | 'email' | 'nome' | 'invalid' | 'date' | 'age';
    value: string;
    testId: string;
}

export default function ValidationError(props: ValidationErrorProps) {
    if (!props.hasChanged) {
       return null; 
    }

    const error = <div data-testid={props.testId} className="error" >{props.errorMessage}</div>

    if (props.type === 'required' ) {
        return (        
            props.value === '' ?
               error
            :null
        );
    }else if (props.type === 'email') {
        return (        
             !isEmailValid(props.value) ?
               error
            :null
     );
    }else if (props.type === 'invalid') {
        return ( 
            Number(props.value) < 0 ? error : null
        );
    }else if (props.type === 'age') {   
        return (
            Number(props.value) < 10 ? error : null
        );

    }else if (props.type === 'date') {
        const minDate = parseISO('2022-01-01');
        const currentDate = parseISO(props.value);
        return isBefore(currentDate, minDate) ? error : null;
      }
    return null;
}