import React,{useState} from 'react'
import './SearchBar.css'
import {useNavigate} from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';



export const SearchBar=({posts})=> {
    const navigate = useNavigate()
    const [wordEntered,serWordEntered]=useState('')
    const [filteredPosts,setFilteredPosts]=useState([])
    const [open, setOpen] = useState(false);

    //const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    const handleFilter=(event)=>{
        const word=event.target.value
        serWordEntered(word)
        console.log(wordEntered)
        const newArr=posts.filter(obj=>obj.title.toLowerCase().includes(word.toLowerCase()))
        if(word!=='')
            setFilteredPosts(newArr)
        else
            setFilteredPosts([])
        setOpen(true);
    }
    const handleClear=()=>{
        setFilteredPosts([])
        serWordEntered('')
        setOpen(false);
        serWordEntered('')
    }
    const handleSelected=(id,image_id)=>{
        navigate('/posts/'+id+'/'+image_id)
        setOpen(false);
    }
    console.log('filtered posts:',filteredPosts)
  return (
    <div>
        <div className="d-flex justify-content-between border rounded align-items-center">
            <input  className="border p-2 " type="text" value={wordEntered} onChange={handleFilter}/>
            {wordEntered===""? <i className="fa-solid fa-magnifying-glass p-1"></i>:
                <i className="fa-solid fa-x" onClick={handleClear}></i>}
        </div>
        {/*modal*/}
       {filteredPosts.length!=0 && (
            <Modal open={open} onClose={onCloseModal} center
                classNames={{
                    overlayAnimationIn: 'customEnterOverlayAnimation',
                    overlayAnimationOut: 'customLeaveOverlayAnimation',
                    modalAnimationIn: 'customEnterModalAnimation',
                    modalAnimationOut: 'customLeaveModalAnimation',
                }}
              animationDuration={800}
              closeIcon="🌸"
            >
                <div className="border rounded p-3">
                    {filteredPosts.map(obj=>
                        <div role="button" key={obj.id} onClick={()=>handleSelected(obj.id,obj.image_id)}>{obj.title}</div>
                        )}
                </div>
            </Modal>)}
    </div>
  )
}
