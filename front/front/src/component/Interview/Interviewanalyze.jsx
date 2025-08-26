import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Interview/Interviewanalyze.css";

export default function Interviewanalyze() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 세팅 화면에서 넘어온 값(없으면 기본값)
  const meta = state || { interviewType: "기술", difficulty: "친절" };

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [analyzing, setAnalyzing] = useState(false); // ✅ 분석 로딩
  const [error, setError] = useState("");

  // ── 초기 세션 시작 (목업) ───────────────────────────────
  useEffect(() => {
    let mounted = true;
    async function startInterview() {
      try {
        setLoading(true);
        setError("");

        // TODO: 실제 API로 교체
        // const { data } = await api.post("/interview/start", {
        //   type: meta.interviewType,
        //   difficulty: meta.difficulty,
        // });
        // if (!mounted) return;
        // setSessionId(data.sessionId);
        // setMessages(data.messages);

        // ── 임시 목업 응답
        const mock = {
          sessionId: String(Date.now()),
          messages: [
            { role: "interviewer", text: "자기소개를 간단히 해주세요." },
            { role: "system", text: "면접이 시작되었습니다. 준비가 되면 답변을 입력하세요." },
          ],
        };
        if (!mounted) return;
        setSessionId(mock.sessionId);
        setMessages(mock.messages);
      } catch {
        if (!mounted) return;
        setError("초기 질문을 불러오지 못했어요. 다시 시도해 주세요.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    startInterview();
    return () => { mounted = false; };
  }, [meta.interviewType, meta.difficulty]);

  // ── 전송 핸들러 (목업) ─────────────────────────────────
  const send = async (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || !sessionId) return;

    setMessages((prev) => [...prev, { role: "candidate", text: value }]);
    setInput("");
    setSending(true);
    setError("");

    try {
      // TODO: 실제 API로 교체
      // const { data } = await api.post(`/interview/${sessionId}/message`, { text: value });
      // setMessages((prev) => [...prev, ...data.messages]);

      // ── 임시 목업: 다음 질문
      const mockNext = [
        { role: "interviewer", text: "최근 프로젝트에서 맡은 역할과 성과를 수치로 설명해 주세요." },
      ];
      setMessages((prev) => [...prev, ...mockNext]);
    } catch {
      setError("전송에 실패했어요. 네트워크를 확인하고 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  };

  // ✅ 면접 분석하기 → /interview/feedback 이동
  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError("");

      // TODO: 실제 API로 교체 (예시)
      // const { data } = await api.post(`/interview/${sessionId}/analyze`, { messages });
      // navigate("/interview/feedback", { state: { ...meta, sessionId, result: data } });

      // ── 임시 목업 결과
      const mockResult = {
        score: 82,
        summary: "핵심 정리는 잘했으나, 수치화된 성과 제시가 부족했습니다.",
        tips: ["성과를 수치로 말하기", "STAR 구조로 대답 정리", "후속 질문 대비 키워드 준비"],
      };

      navigate("/interview/feedback", {
        state: {
          ...meta,
          sessionId,
          result: mockResult, // 내일 API 응답으로 대체
        },
        replace: false,
      });
    } catch {
      setError("분석에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="ifb-wrap">
      <h1 className="ifb-title">면접 시뮬레이션</h1>
      <p className="ifb-meta">
        유형: <strong>{meta.interviewType}</strong> · 난이도: <strong>{meta.difficulty}</strong>
      </p>

      <div className="ifb-chat">
        {loading ? (
          <div className="ifb-skel">불러오는 중…</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`row ${m.role}`}>
              <div className="avatar">👔</div>
              <div className={`bubble ${m.role}`}>{m.text}</div>
            </div>
          ))
        )}
      </div>

      {error && <div className="ifb-error">{error}</div>}
     

      {/* 입력 바 */}
      <form className="ifb-inputbar" onSubmit={send}>
        <input
          type="text"
          placeholder="대답을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending || loading || analyzing}
        />
        <button type="submit" aria-label="send" disabled={sending || loading || analyzing}>🛩️</button>
      </form>

       {/* ✅ 면접 분석하기 버튼 */}
      <button
        className="ifb-analyze"
        type="button"
        onClick={handleAnalyze}
        disabled={loading || analyzing || !sessionId}
        aria-busy={analyzing ? "true" : "false"}
      >
        {analyzing ? "분석 중..." : "면접 분석하기"}
      </button>
    </div>
  );
}
