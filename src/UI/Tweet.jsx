import styles from "./Tweet.module.scss";
import moment from "moment";
import useMoment from "../hooks/useMoment";
import defaultFig from "../components/assets/icons/defaultFig.svg";

const Tweet = () => {
  useMoment();
  const timestamp = moment().valueOf();
  const currentTime = moment(timestamp).format(
    "Ah:mm:ss[・]YYYY[年]MM[月]DD[日]"
  );

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt="Default Fig" />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.name}>Apple</div>
          <div className={styles.account}>@apple</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
        cillum dolor. Voluptate exercitation incididunt aliquip deserunt.{" "}
      </div>
      <div className={styles.createTime}>{currentTime}</div>
      <div className={styles.tweetFeedback}>
        <div className={styles.replyNum}>
          34
          <p>回覆</p>
        </div>
        <div className={styles.likeNum}>
          808
          <p>喜歡次數</p>
        </div>
      </div>
      <div className={styles.actionIcons}></div>
    </div>
  );
};

export default Tweet;
