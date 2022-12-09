import styles from "./Navigation.module.scss";
import logoIcon from "../components/assets/icons/logo.svg";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li style={{ cursor: "default" }}>
          <img src={logoIcon} alt="logoIcon" />
        </li>
        <li>
          <div className={styles.icon__main}></div>
          <p>首頁</p>
        </li>
        <li>
          <div className={styles.icon__personal}></div>
          <p>個人資料</p>
        </li>
        <li>
          <div className={styles.icon__setting}></div>
          <p>設定</p>
        </li>
        <Button
          className="button button__xl active"
          title="推文"
          style={{ width: "178px" }}
        />
      </ul>
      <li>
        <div className={styles.icon__logout}></div>
        <p>登出</p>
      </li>
    </nav>
  );
};

export default Navigation;
