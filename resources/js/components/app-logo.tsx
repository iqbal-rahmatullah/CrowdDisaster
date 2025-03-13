export default function AppLogo() {
    return (
        <div className="flex items-center gap-x-1">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/img/logo.png"></img>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate leading-none font-semibold">CrowdDisaster</span>
            </div>
        </div>
    );
}
