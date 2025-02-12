import { AlchemieInteractiveFrame } from '@alchemiesolns/activity-frame'
import {useState} from "react";
import { isMoleculeValid } from '@alchemiesolns/scorer';

const App = () => {
  const [start, setStart] = useState("");
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(false);
  
  // Lewis Parameters are
  // - showAtomBar
  // - showFormalCharge
  // - showOctetCount
  // - showElectronsPlaced
  // - useCharge
  const params = {showOctetCount: "false"}
  // In this example, we will turn off Octet Count for students, to show the use of the params

  const onStartMessage = (e: MessageEvent) => {
    if (e.data.type === 'configuration') {
        setStart(e.data.configuration);
    }
  }

  const onGoalMessage = (e: MessageEvent) => {
    if (e.data.type === 'configuration') {
      setGoal(e.data.configuration);
    }
  }

  const onResponseMessage = (e: MessageEvent) => {
    if (e.data.type === 'configuration') {
      setResponse(e.data.configuration);
    }
  }

  return ( <>

    Set Start State
    <div>
        <AlchemieInteractiveFrame 
        src={"https://alchemie-lewis2.web.app/"}
        size={"medium"}
        frameClass={""}
        onInteractiveMessage={onStartMessage}/>
    </div>

    Set Goal State
    <div>
        <AlchemieInteractiveFrame 
        src={"https://alchemie-lewis2.web.app/"}
        size={"medium"}
        frameClass={""}
        onInteractiveMessage={onGoalMessage}/>
    </div>

    Student Response
    <div>
        <AlchemieInteractiveFrame 
        src={"https://alchemie-lewis2.web.app/"}
        start={start}
        size={"medium"}
        frameClass={""}
        params={params}
        onInteractiveMessage={onResponseMessage}/>
    </div>

    <button onClick={() => setCorrect(isMoleculeValid(response, [goal]))}>Check Answer</button>
    Answer is {correct.toString()}
  </>)
}

export default App;
