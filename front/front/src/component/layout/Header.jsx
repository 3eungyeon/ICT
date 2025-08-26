import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Header.css';

function Header() {
  return (
    <header>
        <nav>
          <Link to="/home">홈</Link>
           <Link to="/resume/upload">이력서</Link>
           <Link to="/interview/setting">면접</Link>
            <Link to="/auth/signup">회원가입</Link>
           <Link to="/auth/login">로그인</Link>
        </nav>

    </header>
  );
}

export default Header;