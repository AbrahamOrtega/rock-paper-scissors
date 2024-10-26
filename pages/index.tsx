import Image from "next/image";
import { useEffect, useState } from "react";
import Node from "@/helpers/Node";

const paper = new Node({ name: "paper", icon: "/images/icon-paper.svg" });
const rock = new Node({ name: "rock", icon: "/images/icon-rock.svg" });
const scissors = new Node({
  name: "scissors",
  icon: "/images/icon-scissors.svg",
});
const lizard = new Node({
  name: "lizard",
  icon: "/images/icon-lizard.svg",
});
const spock = new Node({ name: "spock", icon: "/images/icon-spock.svg" });

export default function Home() {
  const [logo, setLogo] = useState("/images/logo.svg");
  const [rules, setRules] = useState("/images/image-rules.svg");
  const [options, setOptions] = useState<Node[]>([paper, rock, scissors]);
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [computerChoice, setComputerChoice] = useState<Node>();
  const [userChoice, setUserChoice] = useState<Node>();
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("original");
  const [step, setStep] = useState(0);

  /// Clamp the score between 0 and 99
  const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };

  /// Sleep function
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleGame = async (input: Node) => {
    setUserChoice(input);
    const computer = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(computer);
    setStep(1);
    await delay(1000);

    if (input.getBeast()?.find((node) => node === computer)) {
      setResult("YOU WIN");
      setScore(clamp(score + 1, 0, 99));
    } else if (input.getLoses()?.find((node) => node === computer)) {
      setResult("YOU LOSE");
      setScore(clamp(score - 1, 0, 99));
    } else {
      setResult("DRAW");
    }
  };

  /// Handle the game mode

  const handleGameMode = () => {
    if (mode === "original") {
      setMode("bonus");
    } else {
      setMode("original");
    }
  };

  useEffect(() => {
    if (mode === "bonus") {
      setLogo("/images/logo-bonus.svg");
      setRules("/images/image-rules-bonus.svg");
      setOptions([paper, rock, scissors, lizard, spock]);
      paper.setBeast([rock, spock]);
      paper.setLoses([scissors, lizard]);
      rock.setBeast([scissors, lizard]);
      rock.setLoses([paper, spock]);
      scissors.setBeast([paper, lizard]);
      scissors.setLoses([rock, spock]);
      lizard.setBeast([spock, paper]);
      lizard.setLoses([rock, scissors]);
      spock.setBeast([rock, scissors]);
      spock.setLoses([lizard, paper]);
    } else {
      setLogo("/images/logo.svg");
      setRules("/images/image-rules.svg");
      setOptions([paper, rock, scissors]);
      paper.setBeast([rock]);
      paper.setLoses([scissors]);
      rock.setBeast([scissors]);
      rock.setLoses([paper]);
      scissors.setBeast([paper]);
      scissors.setLoses([rock]);
    }
  }, [mode]);

  const handleShowRules = () => {
    setShowRules(!showRules);
  };

  return (
    <>
      <div className="flex relative">
        <div className="flex flex-col w-full h-screen p-8 items-center relative overflow-hidden">
          {/* Header */}

          <div className="flex w-full max-w-[700px] max-h-[200px] justify-between p-4 border-4 border-[#606E85] rounded-xl">
            <div className="flex w-[150px] h-[100px]">
              <Image src={logo} alt="logo" width={1000} height={2000} />
            </div>

            <div className="flex flex-col bg-white px-8 py-4 h-full rounded-lg justify-center items-center leading-none">
              <p className="text-[18px] text-[#2A46C0] font-[600]">SCORE</p>
              <p className="text-[40px] text-[#3B4363] font-[600]">{score}</p>
            </div>
          </div>

          {/* Game */}
          <div className="flex flex-col w-full h-full items-center justify-center">
            <div
              className={`flex flex-col w-full h-full items-center justify-center`}
            >
              {/* Original Mode Step 1 */}
              <div
                className={`${mode === "original" ? "flex" : "hidden"} ${
                  step === 1 && "animate-[hideElement_300ms_1_forwards]"
                } w-full max-w-[450px] md: p-14 relative`}
              >
                <Image
                  className="triangle"
                  src={"/images/bg-triangle.svg"}
                  alt=""
                  width={500}
                  height={100}
                />
                <button
                  className="flex absolute left-0 button-game paper w-[40%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(paper)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-paper.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
                <div className="flex absolute w-full bottom-0 left-0 justify-center">
                  <button
                    className="flex rock w-[40%] button-game aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                    onClick={() => handleGame(rock)}
                  >
                    <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                      <div className="w-[60px]">
                        <Image
                          src={"/images/icon-rock.svg"}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </button>
                </div>
                <button
                  className="flex absolute right-0 scissors button-game w-[40%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(scissors)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-scissors.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
              </div>

              {/* Bonus Mode Step 1 */}
              <div
                className={`${mode === "bonus" ? "flex" : "hidden"} ${
                  step === 1 && "animate-[hideElement_300ms_1_forwards]"
                } w-full max-w-[500px] md: p-14 relative`}
              >
                <Image
                  className="triangle"
                  src={"/images/bg-pentagon.svg"}
                  alt=""
                  width={500}
                  height={100}
                />
                <button
                  className="flex absolute left-[170px] button-game scissors w-[30%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(scissors)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-scissors.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
                <button
                  className="flex absolute left-0 top-[120px] button-game spock w-[30%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(spock)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-spock.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
                <button
                  className="flex absolute right-0 top-[170px] button-game paper w-[30%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(paper)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-paper.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
                <button
                  className="flex absolute left-[50px] bottom-0 button-game lizard w-[30%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(lizard)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-lizard.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
                <button
                  className="flex absolute right-[50px] bottom-0 button-game rock w-[30%] aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]"
                  onClick={() => handleGame(rock)}
                >
                  <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                    <div className="w-[60px]">
                      <Image
                        src={"/images/icon-rock.svg"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </button>
              </div>

              {/* Original Mode Step 2 */}
              {step === 1 && (
                <div
                  className={`${
                    step === 1 && "animate-[showElement_500ms_1_forwards_300ms]"
                  } flex h-0 w-full max-w-[900px] items-center justify-center overflow-hidden gap-x-[40px]`}
                >
                  {/* You picked */}
                  <div className="flex w-[50%] max-w-[300px] flex-col gap-y-[16px] md:gap-y-[24px] items-center">
                    <h3 className="text-[18px] md:text-[28px]">YOU PICKED</h3>
                    <div
                      className={`flex w-full ${
                        userChoice?.getData().name
                      }-choice aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]`}
                    >
                      <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                        <div className="w-[60px]">
                          <Image
                            src={userChoice?.getData().icon || ""}
                            alt={userChoice?.getData().name || ""}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex flex-col w-0 text-center overflow-hidden animate-[showResult_600ms_1_forwards_1s]">
                    <h3 className="text-[48px] result text-nowrap">{result}</h3>
                    <button
                      className="text-nowrap px-8 py-4 bg-white text-red-500 rounded-lg"
                      onClick={() => setStep(0)}
                    >
                      PLAY AGAIN
                    </button>
                  </div>

                  {/* The house picked */}
                  <div className="flex w-[50%] max-w-[300px] flex-col gap-y-[24px] items-center">
                    <h3 className="text-[18px] md:text-[28px]">
                      THE HOUSE PICKED
                    </h3>
                    <div
                      className={`flex w-full ${
                        computerChoice?.getData().name
                      }-choice aspect-square rounded-full justify-center items-center shadow-[inset_0px_-6px_0px_rgba(0,0,0,0.2)]`}
                    >
                      <div className="flex w-[80%] aspect-square rounded-full justify-center items-center bg-white shadow-[inset_0px_6px_0px_rgba(0,0,0,0.2)]">
                        <div className="w-[60px]">
                          <Image
                            src={computerChoice?.getData().icon || ""}
                            alt={computerChoice?.getData().name || ""}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Show Rules */}
          <div className="flex w-full justify-end">
            <button
              className="text-[14px] rules-btn px-8 py-3 border-4 border-[#606E85] tracking-[6px] rounded-lg"
              onClick={handleShowRules}
            >
              RULES
            </button>
          </div>

          {/* Bonus Mode */}
          <button
            className={`${step === 0 ? "flex" : "hidden"} absolute lizard-btn`}
            onClick={handleGameMode}
          >
            <Image
              src={"/images/icon-lizard.svg"}
              alt="lizard"
              width={50}
              height={50}
            />
          </button>
        </div>

        {/* Rules */}
        <div
          className={`${
            !showRules && "hidden"
          } absolute p-8 rules flex w-full h-[100vh] items-center justify-center`}
          onClick={handleShowRules}
        >
          <div
            className="flex flex-col w-fit p-6 bg-white rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full pb-[32px] justify-between items-center">
              <h4 className="text-[32px] text-[#3B4363]">RULES</h4>
              <button
                className="text-[42px] text-gray-400"
                onClick={handleShowRules}
              >
                <svg
                  className="w-9 h-9"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </div>
            <Image src={rules} alt="" width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  );
}
