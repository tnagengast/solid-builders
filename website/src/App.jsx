import {createSignal, createResource} from "solid-js";
import Card from "./Card";
import LoadingCard from "./LoadingCard";

const fetchUser = async (id) => (await fetch(`https://swapi.dev/api/people/${id}/`)).json();

const App = () => {
    const [userId, setUserId] = createSignal();
    const [user] = createResource(userId, fetchUser);

    setUserId(1);

    return <>
        <div class="flex flex-col min-h-screen bg-gray-100">
            <div class="flex-col bg-white mx-auto w-1/3 my-20 p-4 rounded shadow-xl">
                <input
                    class="pb-4 mb-4 min-w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="number"
                    min="1"
                    placeholder="Enter Numeric Id"
                    value={userId()}
                    onInput={(e) => setUserId(e.currentTarget.value)}
                />
                <div>
                    <span>{user.loading && <LoadingCard />}</span>
                    {user.state === "ready" && <Card user={user()}/>}
                    {/*<LoadingCard />*/}
                </div>
            </div>
        </div>
    </>
};

export default App;
