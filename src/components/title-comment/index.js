import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

import './style.css';


function TitleComment({count, t}) {

  const cn = bem('TitleComment');

  return (
    <h2 className={cn()}>{`${t('comment.title')} (${count})`}</h2>
  )
}

Comment.propTypes = {
  count: PropTypes.number
};

export default memo(TitleComment);