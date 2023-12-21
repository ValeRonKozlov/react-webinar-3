import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";


import './style.css';


function CommentLogIn({exists, type, onChangeLogInText, t}) {

  const cn = bem('CommentLogIn');

  return (
    <>
      {!exists ?
        <div className={cn()} >
          <Link className={cn('link')} to={'/login'}>{t('comment.signIn')}</Link>, {t('comment.signinDescr')} {type === 'false' ? t('comment.signinComment') : t('comment.signinReply')}
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