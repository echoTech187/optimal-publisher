import { logout } from "@/utils/authentication";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function UserProfile(data: any) {
    const userData = data.data;
    // console.log(userData);
    return (<>
        <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
            <button id="dropdown-scrollable" type="button" className="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <div className="avatar">
                    <div className="size-9.5 rounded-full">
                        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                    </div>
                </div>
            </button>
            <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
                <li className="dropdown-header gap-2">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <h6 className="text-base-content text-base font-semibold">{userData.full_name}</h6>
                        <small className="text-base-content/50">{userData.position}</small>
                    </div>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--user]"></span>
                        My Profile
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--settings]"></span>
                        Settings
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--receipt-rupee]"></span>
                        Billing
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--help-triangle]"></span>
                        FAQs
                    </a>
                </li>
                <li className="dropdown-footer gap-2">
                    <a className="btn btn-error btn-soft btn-block" onClick={() =>logout()}>
                        <span className="icon-[tabler--logout]"></span>
                        Sign out
                    </a>
                </li>
            </ul>
        </div>
    </>
    )

}