import React, { useState } from "react";
import "../../styles/Auth/ProfileForm.css"; // 새 CSS 파일 import

const ProfileForm = () => {
  const [techInput, setTechInput] = useState("");
  const [techList, setTechList] = useState([]);
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [role, setRole] = useState("");

  // 기술스택 추가
  const handleAddTech = (e) => {
    e.preventDefault();
    if (techInput.trim() !== "") {
      setTechList([...techList, techInput.trim()]);
      setTechInput("");
    }
  };

  // 기술스택 삭제
  const handleRemoveTech = (index) => {
    setTechList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ techList, experience, education, role });
  };

  return (
    <div className="profile-wrap">
      <h2 className="profile-title">프로필 입력</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* 기술스택 입력 */}
        <label htmlFor="tech">기술스택</label>
        <div className="tech-row">
          <input
            id="tech"
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="사용 기술 입력"
          />
          <button type="button" className="btn-add" onClick={handleAddTech}>
            추가
          </button>
        </div>

        {/* 기술스택 리스트 */}
        {techList.length > 0 && (
          <div className="chip-list">
            {techList.map((tech, index) => (
              <span key={index} className="chip">
                {tech}
                <button
                  type="button"
                  className="chip-remove"
                  onClick={() => handleRemoveTech(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 경력 */}
        <label htmlFor="exp">경력</label>
        <input
          id="exp"
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="경력 입력"
        />

        {/* 학력 */}
        <label htmlFor="edu">학력</label>
        <input
          id="edu"
          type="text"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="학력 입력"
        />

        {/* 직군 */}
        <label htmlFor="role">직군</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">선택</option>
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
          <option value="ai">인공지능</option>
          <option value="data">데이터</option>
          <option value="designer">디자이너</option>
        </select>

        <button type="submit" className="btn-submit">
          제출
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
