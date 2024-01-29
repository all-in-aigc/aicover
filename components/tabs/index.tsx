function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ({ cate }: { cate: string }) {
  const tabs = [
    { name: "最新", href: "/", current: cate === "" || cate === "latest" },
    { name: "最热", href: "/covers/featured", current: cate === "featured" },
    { name: "随机", href: "/covers/random", current: cate === "random" },
    { name: "我的", href: "/covers/mine", current: cate === "mine" },
  ];

  return (
    <div className="mx-auto -mt-8 mb-8">
      <div className="block">
        <div className="">
          <nav
            className="flex items-center justify-center space-x-8"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
