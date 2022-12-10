import styles from "./RecommendFollowList.module.scss";
import defaultFig from "../components/assets/icons/defaultFig.svg";
import Button from "../UI/Button";

const RecommendFollowList = () => {
  const RecommendFollowItem = () => {
    return (
      <div className={styles.recommendFollowItem}>
        <div className={styles.tweetInfo}>
          <img className={styles.avatar} src={defaultFig} alt="Default Fig" />
          <div className={styles.tweetCreatorInfo}>
            <div className={styles.name}>Apple</div>
            <div className={styles.account}>@apple</div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className="button active button__md"
            style={{ width: "100px" }}
            title="正在跟隨"
          />
          <Button
            className="button button__md"
            style={{ width: "66px", height: "40px", display: "none" }}
            title="跟隨"
          />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.recommendFollowList}>
      <div className={styles.title}>推薦跟隨</div>
      <RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
			<RecommendFollowItem />
    </div>
  );
};

export default RecommendFollowList;
