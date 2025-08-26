import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Main/Main.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrap">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Talkcruit</h1>
        <p className="hero-sub">당신의 면접 준비, 이제 Talkcruit와 함께하세요!</p>
        <div className="cta-row">
          <button className="btn-primary" onClick={() => navigate("/auth/signup")}>
            회원가입
          </button>
          <button className="btn-outline" onClick={() => navigate("/auth/login")}>
           로그인
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="sec-title">주요 기능</h2>
        <div className="feat-grid">
          <article className="card">
            <div className="card-emoji">📝</div>
            <h3 className="card-title">이력서 관리</h3>
            <p className="card-desc">파일 업로드로 자동 분석, 항목별 개선 포인트 제공</p>
          </article>
          <article className="card">
            <div className="card-emoji">🎤</div>
            <h3 className="card-title">모의 면접</h3>
            <p className="card-desc">유형·난이도 선택으로 실전 같은 질의응답 연습</p>
          </article>
          <article className="card">
            <div className="card-emoji">📊</div>
            <h3 className="card-title">피드백 리포트</h3>
            <p className="card-desc">요약·점수·TIP으로 다음 답변을 더 명확하게</p>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <h2 className="sec-title">이렇게 사용해요</h2>
        <ol className="steps">
          <li><strong>1.</strong> 이력서를 업로드하고 기본 정보를 자동 채움</li>
          <li><strong>2.</strong> 모의 면접 유형/난이도를 선택하고 연습 시작</li>
          <li><strong>3.</strong> 결과 리포트에서 강·약점과 개선 팁 확인</li>
        </ol>
      </section>

      {/* Announcement */}
      <aside className="announce">
        <span className="tag">공지</span>
        <div className="announce-body">
          <strong>새로운 기능 업데이트 예정!</strong>
          <p>맞춤 질문 추천과 상세 피드백이 곧 추가됩니다.</p>
        </div>
      </aside>
    </div>
  );
}
