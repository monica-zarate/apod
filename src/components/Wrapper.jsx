import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import PhotoCard from "./PhotoCard";
import ArchiveSearch from "./ArchiveSearch";

const navigation = [
  { name: 'Archive', icon: FolderIcon, current: false },
]

export default function Wrapper () {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    return (
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <FontAwesomeIcon icon={faMeteor} className="h-10 w-auto text-orange-400 mb-4 sm:mr-4 sm:mb-0"/>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name} className={classNames(
                                  item.current
                                    ? 'bg-gray-50 text-teal-600'
                                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                )} onClick={() => {setSidebarOpen(false), setDatePickerOpen(true)}}>
                                <item.icon
                                  className={classNames(
                                    item.current ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:block">
          <div className="flex justify-between bg-white p-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMeteor} className="h-10 w-auto text-orange-400 mb-4 sm:mr-4 sm:mb-0"/>
                <h2 className="text-1l font-bold text-teal-600">NASA's</h2>
              </div>
              <h1 className="text-2xl font-bold text-teal-600">Astronomy Photo of the Day</h1>
            </div>
            <ul role="list" className="flex items-center space-x-4">
              {navigation.map((item) => (
                <li 
                key={item.name} 
                className={classNames(
                      item.current
                        ? 'bg-gray-50 text-teal-600'
                        : 'text-teal-800 hover:text-teal-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer w-fit'
                    )}
                onClick={() => setDatePickerOpen(true)}
                >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-teal-600' : 'text-teal-800 group-hover:text-teal-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="">
          <div className="sticky top-0 z-40 flex h-16 sm:h-20 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <h1 className="text-xl font-bold text-teal-600 mr-2">NASA's Astronomy Photo of the Day</h1>
          </div>
          <main className="p-8 pb-24 bg-teal-50 flex justify-center">
              <PhotoCard selectedDate={selectedDate}/>
          </main>
        </div>
        <ArchiveSearch open={datePickerOpen} setOpen={setDatePickerOpen} setSelectedDate={setSelectedDate}/>
      </div>
    )
}