import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {addItem, deleteItem} from './redux/actions';




// -------- App Component --------
const App = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const input = useRef()

    return (
        <>
            <WishList 
                wishList={props.wishList}
                inputRef={input}
                onListItemClick = {props.deleteItem}
                onAddClick={() => {
                    props.addItem({value: input.current.value})
                    input.current.value = '';
                }}
                onSubmitClick={() => {
                    if (props.wishList.length > 0) {
                        props.deleteAllItems();
                        setShowOverlay(true)
                    }
                }}
            />
            <Overlay 
                show={showOverlay}
                onClick={() => setShowOverlay(false)}
            />
        </>
    )
}

const mapStateToProps = state => {
    return { ...state }
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item) => dispatch(addItem(item)),
        deleteItem: (item) => dispatch(deleteItem(item)),
        deleteAllItems: () => dispatch({ type: 'DELETE_ALL_ITEMS' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);




// WISHLIST COMPONENT
const WishList = (props) => {
    return (
        <Container>
                <ContainerItem>
                    <Text
                        fontSize='1.2em'
                        fontWeight='700'
                    >
                        MY WISHLIST
                    </Text>
                </ContainerItem>
                <ContainerItem>
                    <List>
                        {props.wishList.map((item) =>
                            <ListItem 
                                key={item.key}
                                onClick={() => {props.onListItemClick(item)}}
                            >
                                {item.value}
                            </ListItem>
                        )}
                    </List>
                </ContainerItem>
                <ContainerItem>
                    <Input ref={props.inputRef}></Input>
                </ContainerItem>
                <ContainerItem>
                    <Button onClick={props.onAddClick}>Add</Button>
                </ContainerItem>
                <ContainerItem>
                    <Button onClick={props.onSubmitClick}>Submit</Button>
                </ContainerItem>
            </Container>
    )
}

WishList.defaultProps = {
    wishList: [],
    inputRef: null,
    onListItemClick: () => {},
    onAddClick: () => {},
    onSubmitClick: () => {},
}





// -------- ALERT COMPONENT --------
const Alert = (props) => {
    return (
        <div className="Alert">
            {props.children}
            <style jsx>{`
                .Alert {
                    border-radius: 4px;
                    background-color: #ffffff;
                    padding: 1.5em 2em;
                    left: 50%;
                    font-size: 1rem;
                    box-shadow: 0 0 16px rgba(0, 0, 0, .25);
                }
            `}</style>
        </div>
    )
}

Alert.defaultProps = {
    chidren: null
}




// -------- ALERT ITEM COMPONENT --------
const AlertItem = (props) => {
    return (
        <div className='AlertItem'>
            {props.children}
            <style jsx>{`
                .AlertItem {
                    width: 100%;
                }

                .AlertItem:not(:first-of-type) {
                    padding-top: 1.25em;
                }
            `}</style>
        </div>
    )
}

AlertItem.defaultProps = {
    children: null,
}




// -------- OVERLAY COMPONENT --------
const Overlay = (props) => {
    return (
        <div className='Overlay'
            style={{
                display: props.show ? null : 'none'
            }}
        >
            <Alert>
                <AlertItem>
                    <Text>Wish list submitted to Santa!</Text>
                </AlertItem>
                <AlertItem>
                    <Button onClick={props.onClick}>That's neat!</Button>
                </AlertItem >
            </Alert>
            <style jsx>{`
                .Overlay {
                    position: fixed;
                    top: 0;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    background-color: rgba(0, 0, 0, .5);
                    width: 100%;
                    height: 100vh;
                    padding-top: 2em;
                    font-size: 1rem;
                }
            `}</style>
        </div>
    )
}

Overlay.defaultProps = {
    children: null,
    hide: true,
    onClick: () => {}
}




// CONTAINER COMPONENT
const Container = (props) => {
    return (
        <div className="Container">
            {props.children}
            <style jsx>{`
                .Container {
                    margin-top: 2em;
                    margin-right: auto;
                    margin-left: auto;
                    box-shadow: 0 0 16px rgba(0, 0, 0, .5);
                    border-radius: 4px;
                    width: 24%;
                    min-width: 256px;
                    background-color: #FCC0CB;
                    padding: 2em 4em;
                    font-size: 1rem;
                    
                }
            `}</style>
        </div>
    )
}

Container.defaultProps = {
    children: null
}




// -------- CONTAINER ITEM COMPONENT --------
const ContainerItem = (props) => {
    return (
        <div className='ContainerItem'>
            {props.children}
            <style jsx>{`
                .ContainerItem {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    font-size: 1rem;
                }

                .ContainerItem:not(:first-of-type) {
                    padding-top: 1em;
                }
            `}</style>
        </div>
    )
}

ContainerItem.defaultProps = {
    children: null
}




// -------- LIST COMPONENT --------
const List = (props) => {
    return (
        <div className="List">
            {props.children}
            <style jsx>{`
                .List {
                    border-style: solid;
                    border-color: #00000;
                    border-width: 2px;
                    border-radius: 4px;
                    min-height: 16em;
                    width: 100%;
                    background-color: #ffffff;
                    padding-right: .5em;
                    padding-left: .5em;
                    font-size: 1rem;
                }
            `}</style>
        </div>
    )
}

List.defaultProps = {
    children: null
}



// -------- LIST ITEM COMPONENT --------
const ListItem = (props) => {
    return (
        <div 
            className='ListItem'
            onClick={props.onClick}
        >
        {props.children}
        <style jsx>{`
            .ListItem {
                width: 100%;
                padding-top: .5em;
                padding-bottom: .5em;
                transition: transform .25s;
                transform-origin: left;
            }

            .ListItem:hover {
                transform: scale(1.1);
                cursor: pointer;
            }
        `}</style>
        </div>
    )
}

ListItem.defaultProps = {
    children: null,
    onClick: () => {}
}




// -------- INPUT COMPONENT --------
const Input = React.forwardRef((props, ref) => {
    return (
        <>
            <input 
                ref={ref}
                className='Input'
            >
            </input>
            <style jsx>{`
                .Input {
                    border-style: solid;
                    border-color: #000000;
                    border-width: 2px;
                    border-radius: 4px;
                    background-color: #ffffff;
                    height: 1.5em;
                    width: 100%;
                    padding: .5em;
                    transition: border-color, .25s;
                }

                .Input:hover, input:focus, input:active {
                    border-color: #BDD5F4;
                    border-top-left-color: red;
                    outline: none;
                }
            `}</style>
        </>
    )
})




// -------- TEXT COMPONENT --------
const Text = (props) => {
    return (
        <span 
            style = {{
                fontSize: props.fontSize,
                fontWeight: props.fontWeight
            }}
        >
            {props.children}
        </span>
    )
}

Text.defaultProps = {
    fontSize: '1rem',
    fontWeight: '700',
    children: null
}




// -------- BUTTON COMPONENT --------
const Button = (props) => {
    return (
        <button 
            className='Button'
            onClick={props.onClick}
        >
            {props.children}
            <style jsx>{`
                .Button {
                    box-shadow: 0 0 16px rgba(0, 0, 0, .25);
                    border-width: 0;
                    border-radius: 4px;
                    width: 100%;
                    background-color: #91EB92;
                    padding: .75em 1.75em;
                    font-size: 1rem;
                    font-weight: 700;
                    transition: opacity .25s, background-color .1s; 
                }

                .Button:hover, .Button:focus {
                    opacity: .5;
                    outline: none;
                    cursor: pointer;
                }

                .Button:active {
                    background-color: #6BDA6C;
                    outline: none;
                }
            `}</style>
        </button>
    )
}

Button.defaultProps = {
    children: null
}