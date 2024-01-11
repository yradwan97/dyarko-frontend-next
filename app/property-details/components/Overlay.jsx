import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function Overlay({ visible, setVisible, children }) {
  return (
    <div>
      <Transition appear show={visible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 w-full h-full z-[9999] flex justify-center items-center md:py-7 px-5"
          onClose={() => setVisible(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute w-full h-full inset-0 bg-black/20"
              onClick={() => setVisible(false)}
            ></div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Overlay;
