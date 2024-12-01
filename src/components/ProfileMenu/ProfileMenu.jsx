import { Fragment } from "react";
import { Link } from "react-router-dom"; 
import { Menu, Transition } from "@headlessui/react";
import PropTypes from 'prop-types';
import { signOut } from "../../utils/supabaseAuth";

const ProfileMenu = ({ session }) => {
  const handleSignOut = async () => {
    try {
      await signOut(); // Call signOut without checking for result.success
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e7e7e9]">
          <img 
            src={session?.photoURL || `/avatar.svg`}
            alt="Perfil" 
            className="w-full h-full object-cover"
          />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#e7e7e9] focus:outline-none">
          <div className="p-2">
            {/* User Info */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-[#0d0c22]">
                {session?.displayName || session?.email}
              </p>
              <p className="text-xs text-[#6e6d7a]">
                {session?.email}
              </p>
            </div>

            <div className="border-t border-[#e7e7e9] my-2" />

            {/* Menu Items */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/profile/${session?.uid}`}
                  className={`${
                    active ? 'bg-[#f8f7f4]' : ''
                  } block px-3 py-2 text-sm text-[#0d0c22] rounded-md`}
                >
                  Perfil
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/account/settings"
                  className={`${
                    active ? 'bg-[#f8f7f4]' : ''
                  } block px-3 py-2 text-sm text-[#0d0c22] rounded-md`}
                >
                  Configuración
                </Link>
              )}
            </Menu.Item>

            <div className="border-t border-[#e7e7e9] my-2" />

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-[#f8f7f4]' : ''
                  } block w-full text-left px-3 py-2 text-sm text-[#0d0c22] rounded-md`}
                >
                  Cerrar Sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  session: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string
  })
};

export default ProfileMenu;
