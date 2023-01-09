import {render} from '@testing-library/react'
import {Posts} from './Posts'

const data=[]


describe('Posts component', () => {

    it('rendered Posts',()=>{
        const {getByTestId}=render(<Posts posts={data}/>)
        const postsComponent =getByTestId('posts-component')
        expect(postsComponent).toBeTruthy()
    })

    it('render div with message',()=>{
        const {getByTestId}=render(<Posts posts={data}/>)
        const div =getByTestId('div-msg')
        expect(div).toBeTruthy()
    })

    
})