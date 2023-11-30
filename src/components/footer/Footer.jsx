import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=" bg-zinc-900 py-12 text-white grid md:grid-cols-2 lg:grid-cols-4 px-4 md:px-18 lg:px-20">
      <div className="pb-8">
        <h1 className=" pb-3 text-xl font-bold">Links</h1>
        <ul>
          <li className="pb-2 text-gray-400">
            <Link>About Us</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Contact Us</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Blog</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>FAQ's</Link>
          </li>
        </ul>
      </div>
      <div className="pb-8">
        <h1 className=" pb-3 text-xl font-bold">About Shopping Hub</h1>
        <ul>
          <li className="pb-2 text-gray-400">
            <Link>Company Info</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Branches</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Store</Link>
          </li>
        </ul>
      </div>
      <div className="pb-8">
        <h1 className=" pb-3 text-xl font-bold">Polices</h1>
        <ul>
          <li className="pb-2 text-gray-400">
            <Link>Terms & Conditions</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Cookies Policy</Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>Data Policy</Link>
          </li>
        </ul>
      </div>
      <div className="pb-8">
        <h1 className=" pb-3 text-xl font-bold">Contact</h1>
        <ul>
          <li className="pb-2 text-gray-400">
            <Link>
              <i className="ri-phone-line"></i> +95 9786 507 670
            </Link>
          </li>
          <li className="pb-2 text-gray-400">
            <Link>
              <i className="ri-mail-line"></i> htarhtarei670@gmail.com
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer
