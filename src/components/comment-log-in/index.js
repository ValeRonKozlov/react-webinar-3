import { memo, useCallback } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { useLocation, useNavigate} from 'react-router-dom';


import './style.css';


function CommentLogIn({exists, type, onChangeLogInText, t}) {

  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  const cn = bem('CommentLogIn');

  return (
    <>
      {!exists ?
        <div className={cn()} >
          <a className={cn('link')} onClick={callbacks.onSignIn}>{t('comment.signIn')}</a>, {t('comment.signinDescr')} {type === 'false' ? t('comment.signinComment') : t('comment.signinReply')}
          {type === 'false' ? null : <button type={'button'} value={false} className={cn('button')} onClick={onChangeLogInText}>{t('comment.cansel')}</button>}
        </div> :
        null
      }
    </>
  )
}

CommentLogIn.propTypes = {
  exists: PropTypes.bool,
  type: PropTypes.string,
  onChangeLogInText: PropTypes.func,

};

export default memo(CommentLogIn);