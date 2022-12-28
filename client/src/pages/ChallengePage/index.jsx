import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Ch from "./styles";
import Button from "../../components/common/Button.jsx";
import rank1 from "@/assets/ranking/ranking1.png";
import rank2 from "@/assets/ranking/ranking2.png";
import rank3 from "@/assets/ranking/ranking3.png";
import rank4 from "@/assets/ranking/ranking4.png";
import rank5 from "@/assets/ranking/ranking5.png";
import rank6 from "@/assets/ranking/ranking6.png";
import level1 from "@/assets/level/level1.png";
import level2 from "@/assets/level/level2.png";
import level3 from "@/assets/level/level3.png";
import Challenge from "@/components/challenge";
import selectImg from "@/assets/challenge/select.png";
import axios from "axios";
// import { userIdState } from "../../store/userState";

function ChallengePage() {
  const navigate = useNavigate();
  const [clist, setClist] = useState([]);
  const [listLoad, setListLoad] = useState(false);
  const [fregion, setFregion] = useState("");
  const [ftier, setFtier] = useState("");
  const [flevel, setFlevel] = useState("");
  const [region, setRegion] = useState({
    gyeonggi: false,
    gyeongsb: false,
    gyeongsn: false,
    jeollabuk: false,
    jeollanam: false,
    chungcb: false,
    chungcn: false,
    gangwon: false,
    jeju: false,
  });
  const [tier, setTier] = useState({
    bronze: false,
    silver: false,
    gold: false,
    platinum: false,
    diamond: false,
    umm: false,
  });
  const [level, setLevel] = useState({
    level1: false,
    level2: false,
    level3: false,
  });

  const onButtonClick = (e) => {
    console.log(e.target.name, e.target.value);
  };
  const onPageButton = (e) => {
    e.preventDefault();
    navigate("/challenge_write");
  };
  const onTierClick = (e) => {
    setTier(() => {
      let newTier = { ...tier };
      !newTier[e.target.name]
        ? Object.values(newTier).forEach((value) => {
            if (value === true) {
              newTier = {
                bronze: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: false,
                umm: false,
              };
            }
          })
        : null;
      newTier[e.target.name]
        ? (newTier[e.target.name] = false)
        : (newTier[e.target.name] = true);
      return newTier;
    });
    setFtier(e.target.getAttribute("value"));
  };
  const onLevelClick = (e) => {
    console.log(e.target);
    setLevel(() => {
      let newLevel = { ...level };
      !newLevel[e.target.name]
        ? Object.values(newLevel).forEach((value) => {
            if (value === true) {
              newLevel = {
                level1: false,
                level2: false,
                level3: false,
              };
            }
          })
        : null;
      newLevel[e.target.name]
        ? (newLevel[e.target.name] = false)
        : (newLevel[e.target.name] = true);
      return newLevel;
    });
    setFlevel(e.target.getAttribute("value"));
  };
  const onRegionClick = (e) => {
    console.log(e.target.getAttribute("name"));

    setRegion(() => {
      let newRegion = { ...region };
      !newRegion[e.target.getAttribute("name")]
        ? Object.values(newRegion).forEach((value) => {
            if (value === true) {
              newRegion = {
                gyeonggi: false,
                gyeongsb: false,
                gyeongsn: false,
                jeollabuk: false,
                jeollanam: false,
                chungcb: false,
                chungcn: false,
                gangwon: false,
                jeju: false,
              };
            }
          })
        : null;
      newRegion[e.target.getAttribute("name")]
        ? (newRegion[e.target.getAttribute("name")] = false)
        : (newRegion[e.target.getAttribute("name")] = true);

      return newRegion;
    });
    setFregion(e.target.getAttribute("value"));
  };

  const onLogoutButton = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  useEffect(() => {
    setListLoad(false);
    let nowTime = new Date();
    axios
      .get("http://localhost:8000/challenges?order=desc&page=1&take=20")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        let newList = data.data.filter((value) => {
          return new Date(value.dueDate) - nowTime >= 0;
        });
        console.log(newList);
        setClist(newList);
        setListLoad(true);
      });
  }, []);

  return (
    <Ch.ChallengePageBox>
      <Ch.ChallengefilterBox>
        <Ch.RegionBox>
          <Ch.FilterTitleBox>지역별 산행</Ch.FilterTitleBox>
          <Ch.FilterContentBox>
            <Ch.FilterContents>
              <Ch.FilterContent
                className={region["gyeonggi"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="gyeonggi"
                  value="경기도"
                  onClick={onRegionClick}
                >
                  경기도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["gyeongsb"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="gyeongsb"
                  value="경상북도"
                  onClick={onRegionClick}
                >
                  경상북도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["gyeongsn"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="gyeongsn"
                  value="경상남도"
                  onClick={onRegionClick}
                >
                  경상남도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["jeollabuk"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="jeollabuk"
                  value="전라북도"
                  onClick={onRegionClick}
                >
                  전라북도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["jeollanam"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="jeollanam"
                  value="전라남도"
                  onClick={onRegionClick}
                >
                  전라남도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["chungcb"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="chungcb"
                  value="충청북도"
                  onClick={onRegionClick}
                >
                  충청북도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["chungcn"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="chungcn"
                  value="충청남도"
                  onClick={onRegionClick}
                >
                  충청남도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent
                className={region["gangwon"] ? "backLevel" : null}
              >
                <Ch.FilterText
                  name="gangwon"
                  value="강원도"
                  onClick={onRegionClick}
                >
                  강원도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent className={region["jeju"] ? "backLevel" : null}>
                <Ch.FilterText
                  name="jeju"
                  value="제주도"
                  onClick={onRegionClick}
                >
                  제주도
                </Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText></Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText></Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText></Ch.FilterText>
              </Ch.FilterContent>
            </Ch.FilterContents>
          </Ch.FilterContentBox>
        </Ch.RegionBox>
        <Ch.TierBox>
          <Ch.FilterTitleBox>계급별 산행</Ch.FilterTitleBox>
          <Ch.FilterContentBox>
            <Ch.FilterTierContents>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["bronze"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank1}
                      name="bronze"
                      value="브론즈"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크1</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["silver"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank2}
                      name="silver"
                      value="실버"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크2</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["gold"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank3}
                      name="gold"
                      value="골드"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크3</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["platinum"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank4}
                      name="platinum"
                      value="플레티넘"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크4</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["diamond"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank5}
                      name="diamond"
                      value="다이아몬드"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크5</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
              <Ch.TierContent>
                <Ch.TierContentContainer
                  className={tier["umm"] ? "backLevel" : null}
                >
                  <Ch.TierImg>
                    <img
                      src={rank6}
                      name="umm"
                      value="엄홍길"
                      onClick={onTierClick}
                    />
                  </Ch.TierImg>
                  <Ch.TierName>랭크6</Ch.TierName>
                </Ch.TierContentContainer>
              </Ch.TierContent>
            </Ch.FilterTierContents>
          </Ch.FilterContentBox>
        </Ch.TierBox>
        <Ch.LevelBox>
          <Ch.FilterTitleBox>난이도 산행</Ch.FilterTitleBox>
          <Ch.FilterContentBox>
            <Ch.FilterContents>
              <Ch.LevelContent>
                <Ch.LevelContentContainer
                  className={level["level1"] ? "backLevel" : null}
                >
                  <Ch.LevelImg>
                    <Ch.Limg
                      src={level1}
                      name="level1"
                      value="하"
                      onClick={onLevelClick}
                    />
                  </Ch.LevelImg>
                  <Ch.LevelName>하</Ch.LevelName>
                </Ch.LevelContentContainer>
              </Ch.LevelContent>
              <Ch.LevelContent>
                <Ch.LevelContentContainer
                  className={level["level2"] ? "backLevel" : null}
                >
                  <Ch.LevelImg>
                    <Ch.Limg
                      src={level2}
                      name="level2"
                      value="중"
                      onClick={onLevelClick}
                    />
                  </Ch.LevelImg>
                  <Ch.LevelName>중</Ch.LevelName>
                </Ch.LevelContentContainer>
              </Ch.LevelContent>
              <Ch.LevelContent>
                <Ch.LevelContentContainer
                  className={level["level3"] ? "backLevel" : null}
                >
                  <Ch.LevelImg>
                    <Ch.Limg
                      src={level3}
                      name="level3"
                      value="상"
                      onClick={onLevelClick}
                    />
                  </Ch.LevelImg>
                  <Ch.LevelName>상</Ch.LevelName>
                </Ch.LevelContentContainer>
              </Ch.LevelContent>
            </Ch.FilterContents>
          </Ch.FilterContentBox>
        </Ch.LevelBox>
        <Ch.selectBox>
          <Ch.selectRegionBox>
            <Ch.selectTitle>
              <Ch.titleSpan>지역</Ch.titleSpan>
            </Ch.selectTitle>
            <Ch.selectContent>
              <Ch.contentSpan>{fregion}</Ch.contentSpan>
            </Ch.selectContent>
          </Ch.selectRegionBox>
          <Ch.selectTierBox>
            <Ch.selectTitle>
              <Ch.titleSpan>계급</Ch.titleSpan>
            </Ch.selectTitle>
            <Ch.selectContent>
              <Ch.contentSpan>{ftier}</Ch.contentSpan>
            </Ch.selectContent>
          </Ch.selectTierBox>
          <Ch.selectLevelBox>
            <Ch.selectTitle>
              <Ch.titleSpan>난이도</Ch.titleSpan>
            </Ch.selectTitle>
            <Ch.selectContent>
              <Ch.contentSpan>{flevel}</Ch.contentSpan>
            </Ch.selectContent>
          </Ch.selectLevelBox>
          <Ch.selectButtonBox>
            <Ch.buttonDiv>
              <Ch.selectButton type="button">
                <Ch.sButtonImg src={selectImg} />
                <Ch.sButtonlabel>Select</Ch.sButtonlabel>
              </Ch.selectButton>
            </Ch.buttonDiv>
          </Ch.selectButtonBox>
        </Ch.selectBox>
      </Ch.ChallengefilterBox>
      <Ch.ChallengeListContainer>
        {clist.map((chall) => (
          <Challenge data={chall} />
        ))}
      </Ch.ChallengeListContainer>
      <Ch.addButton onClick={onPageButton}>
        <Ch.addLogoSpan>+</Ch.addLogoSpan>
      </Ch.addButton>
      {localStorage.getItem("userId") !== "" ? (
        <Ch.logoutButton onClick={onLogoutButton}>로그아웃</Ch.logoutButton>
      ) : null}
    </Ch.ChallengePageBox>
  );
}

export default ChallengePage;
