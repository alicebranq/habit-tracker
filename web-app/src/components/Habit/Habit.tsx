interface HabitProps{
    completed: number
}   

function Habit(props: HabitProps) {
    return(
        <div className="bg-zinc-900 w-18" >
            {props.completed}
        </div>

    )
}

export default Habit