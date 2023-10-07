import React from 'react'

interface Props {
    name: string;
}

function useSceneManager(props:Props) {


    return (
        <div>useSceneManager {props.name}</div>
    )
}

export default useSceneManager


