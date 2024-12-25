import SideBar from "../Components/sidebar";
import Topbar from "../Components/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Topbar />
            <div className="flex ">
                <SideBar />
                {children}
            </div>
        </div>
    )
}