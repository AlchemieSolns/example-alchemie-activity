import { AlchemieInteractiveFrame } from '@alchemiesolns/activity-frame'
import {useState} from "react";
import { isConfigValid } from '@alchemiesolns/scorer';

const App = () => {
  const [start, setStart] = useState("");
  const [goal, setGoal] = useState("");
  const [url, setUrl] = useState("https://alchemie-lewis2.web.app/");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(false);
  
  const [paramString, setParamString] = useState("");
  const [paramObject, setParamObject] = useState({});

  // Lewis Parameters are
  // - showAtomBar
  // - showFormalCharge
  // - showOctetCount
  // - showElectronsPlaced
  // - useCharge
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

  const setParams = (s: string) => {
    setParamString(s);
    try {
      setParamObject(JSON.parse(s));
    } catch(e) {
      setParamObject({});
    }
  }

  return ( <>
    <div>
        Interactive URL: <input name="myInput" value={url} onChange={(e) => setUrl(e.currentTarget.value)}/>
    </div>
    <div>
        Parameters/Options: <input name="myInput" value={paramString} onChange={(e) => setParams(e.currentTarget.value)}/>
    </div>
    <div>
      Set Start State
    </div>
    <div>
        <AlchemieInteractiveFrame 
        src={url}
        size={"medium"}
        frameClass={""}
        onInteractiveMessage={onStartMessage}/>
    </div>

    Set Goal State
    <div>
        <AlchemieInteractiveFrame 
        src={url}
        size={"medium"}
        frameClass={""}
        onInteractiveMessage={onGoalMessage}/>
    </div>

    Student Response
    <div>
        <AlchemieInteractiveFrame 
        src={url}
        start={start}
        size={"medium"}
        frameClass={""}
        params={paramObject}
        onInteractiveMessage={onResponseMessage}/>
    </div>

    <button onClick={() => setCorrect(isConfigValid(url, response, [goal], paramObject))}>Check Answer</button>
    Answer is {correct.toString()}
  </>)
}

export default App;
