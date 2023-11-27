import { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"; 
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  const [list,setList] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [button,setButton] = useState("Add Item");
  const [editIndex, setEditIndex] = useState(null);
  const [addMsg,setAddMsg] = useState(false);
  const [deleteMsg,setDeleteMsg] = useState(false);
  const [editMsg,setEditMsg] = useState(false);
  const [clearAllMsg,setClearAllMsg] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  };
  const handleAddItem = () => {
    if(button == "Edit"){
      list[editIndex] = inputValue.trim();
      setList(list);
      setButton("Add item")
      setEditIndex(null);
      setEditMsg(true);
      setTimeout(()=>setEditMsg(false),3000);
    }
    else{
      setList([...list, inputValue.trim()]);
      setAddMsg(true);
      setTimeout(()=>setAddMsg(false),3000); 
    }
    setInputValue("");
  };

  const deleteItem=(index)=>{
    const updatedList = list.filter((_,i)=> i !== index);
    setList(updatedList);
    setDeleteMsg(true);
    setTimeout(()=>setDeleteMsg(false),3000);
  }

  const handleEdit=(index)=>{
    setInputValue(list[index]);
    setButton("Edit");
    setEditIndex(index);
  }
  return (
    <>
      <div style={{width:"35%",margin:"auto","backgroundColor":"white",marginTop:"120px"}}>

        {addMsg ? <div style={{"textAlign":"center","color":"green"}}>Item added to the list</div> : ""}
        {deleteMsg ? <div style={{"textAlign":"center","color":"red"}}>Item removed</div> : ""}
        {editMsg ? <div style={{"textAlign":"center","color":"green"}}>Item changed</div> : ""} 
        {clearAllMsg ? <div style={{"textAlign":"center","color":"red"}}>Empty List</div> : ""}       

        <div style={{"textAlign":"center","fontSize":"23px","paddingBottom":"20px"}}>Grocery Bud</div>
        <input type="text" 
          style={{height:"23px",width:"300px","borderRadius":"5px","borderColor":"lightgrey","borderWidth":"2px","marginBottom":"20px","marginLeft":"33px"}}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button style={{height:"29px",width:"100px",color:"white","backgroundColor":"deepskyblue","border":"none","borderRadius":"5px"}}
        onClick={handleAddItem}>{button}</button>

          {list.map((item, index) => (
            <div key={index} style={{marginLeft:"33px",marginBottom:"10px"}}>{item}
            <FontAwesomeIcon icon={faTrashCan} 
              style={{color: "#f53100","float":"right","marginRight":"35px"}}
              onClick={()=>deleteItem(index)} />
            <FontAwesomeIcon icon={faPenToSquare} 
              style={{color: "#1ee01a","float":"right","marginRight":"15px"}}
              onClick={()=> handleEdit(index)} />
            </div>
        ))}

        <button style={{"marginLeft":"210px","marginBottom":"10px"}}
          onClick={()=>{
            setList([])
            setClearAllMsg(true)
            setTimeout(()=>setClearAllMsg(false),3000);
            }
          }
        >Clear All</button>
      </div>
    </>
  );
}

export default App;
