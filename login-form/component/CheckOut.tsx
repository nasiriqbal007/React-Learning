import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

type Step = "information" | "shipping" | "payment";

type FormData = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: string;
};

type Items = {
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

function CheckOut() {
  const items: Items[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingCost = 10;
  const [order, setOrder] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("information");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };

      if (name === "email") {
        if (!value) newErrors.email = "Email required";
        else if (!value.includes("@") || !value.includes("."))
          newErrors.email = "Invalid email";
        else delete newErrors.email;
      }
      if (name === "phone") {
        if (!value) newErrors.phone = "Phone required";
        else if (value.length < 10) newErrors.phone = "Invalid phone";
        else delete newErrors.phone;
      }
      if (name === "firstName") {
        if (!value) newErrors.firstName = "Required";
        else delete newErrors.firstName;
      }
      if (name === "lastName") {
        if (!value) newErrors.lastName = "Required";
        else delete newErrors.lastName;
      }
      if (name === "country") {
        if (!value) newErrors.country = "Required";
        else delete newErrors.country;
      }
      if (name === "state") {
        if (!value) newErrors.state = "Required";
        else delete newErrors.state;
      }
      if (name === "address") {
        if (!value) newErrors.address = "Required";
        else delete newErrors.address;
      }
      if (name === "city") {
        if (!value) newErrors.city = "Required";
        else delete newErrors.city;
      }
      if (name === "postalCode") {
        if (!value) newErrors.postalCode = "Required";
        else if (value.length < 5) newErrors.postalCode = "Invalid postal code";
        else delete newErrors.postalCode;
      }
      if (name === "cardNumber") {
        if (!value) newErrors.cardNumber = "Required";
        else if (value.replace(/\s/g, "").length !== 10)
          newErrors.cardNumber = "Must be 10 digits";
        else delete newErrors.cardNumber;
      }
      if (name === "nameOnCard") {
        if (!value) newErrors.nameOnCard = "Required";
        else delete newErrors.nameOnCard;
      }
      if (name === "expiry") {
        if (!value) newErrors.expiry = "Required";
        else if (!/^\d{2}\/\d{2}$/.test(value))
          newErrors.expiry = "MM/YY format";
        else delete newErrors.expiry;
      }
      if (name === "cvv") {
        if (!value) newErrors.cvv = "Required";
        else if (value.length < 3 || value.length > 4)
          newErrors.cvv = "3-4 digits";
        else delete newErrors.cvv;
      }

      return newErrors;
    });
  };

  const validateInformation = (data: FormData) => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!data.email) errors.email = "Email required";
    else if (!data.email.includes("@") || !data.email.includes("."))
      errors.email = "Invalid email";
    if (!data.phone) errors.phone = "Phone required";
    else if (data.phone.length < 10) errors.phone = "Invalid phone";
    if (!data.firstName) errors.firstName = "Required";
    if (!data.lastName) errors.lastName = "Required";
    if (!data.country) errors.country = "Required";
    if (!data.state) errors.state = "Required";
    if (!data.address) errors.address = "Required";
    if (!data.city) errors.city = "Required";
    if (!data.postalCode) errors.postalCode = "Required";
    else if (data.postalCode.length < 5)
      errors.postalCode = "Invalid postal code";
    return errors;
  };

  const validatePayment = (data: FormData) => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!data.cardNumber) errors.cardNumber = "Required";
    else if (data.cardNumber.replace(/\s/g, "").length !== 10)
      errors.cardNumber = "Must be 10 digits";
    if (!data.nameOnCard) errors.nameOnCard = "Required";
    if (!data.expiry) errors.expiry = "Required";
    else if (!/^\d{2}\/\d{2}$/.test(data.expiry))
      errors.expiry = "MM/YY format";
    if (!data.cvv) errors.cvv = "Required";
    else if (data.cvv.length < 3 || data.cvv.length > 4)
      errors.cvv = "Must be 3-4 digits";
    return errors;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateInformation(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep("shipping");
    }
  };

  const handlePaymentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validatePayment(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setOrder(true);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-10 py-10 px-10">
      <div className="w-full flex items-start justify-start gap-4 px-20 flex-col">
        <RouterLink to="/home">
          <svg
            className="hover:cursor-pointer transition-all duration-300 hover:scale-125"
            width="61"
            height="14"
            viewBox="0 0 61 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60.25 6.75H0.75M0.75 6.75L6.75 0.75M0.75 6.75L6.75 12.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RouterLink>

        <h1 className="text-2xl font-extrabold text-(--text-color)">
          Checkout Page
        </h1>

        <nav className="w-full flex flex-row items-start gap-8 uppercase">
          {(["information", "shipping", "payment"] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === "information") {
                  setStep("information");
                  return;
                }

                if (s === "shipping") {
                  const newErrors = validateInformation(formData);
                  setErrors(newErrors);
                  if (Object.keys(newErrors).length === 0) setStep("shipping");
                  return;
                }

                if (s === "payment") {
                  const infoErrors = validateInformation(formData);
                  setErrors(infoErrors);
                  if (Object.keys(infoErrors).length > 0) {
                    setStep("information");
                    return;
                  }
                  setStep("payment");
                }
              }}
              className={`nav-link ${step === s ? "text-(--primary-color) font-bold" : "text-(--grey-color)"}`}
            >
              {s}
            </button>
          ))}
        </nav>
      </div>

      <div className="w-full flex items-start justify-center px-20 gap-50 py-10">
        {/* left */}
        <section className="flex flex-1 flex-col items-start justify-start gap-6">
          {step === "information" && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-start gap-4 w-full"
            >
              <h2 className="text-xl font-extrabold uppercase text-(--text-color) mb-4">
                Contact Info
              </h2>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="input-field"
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="phone"
                className="input-field"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">{errors.phone}</span>
              )}

              <h2 className="text-xl font-extrabold uppercase text-(--text-color) py-5">
                Shipping Address
              </h2>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="first name"
                className="input-field"
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">{errors.firstName}</span>
              )}

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="last name"
                className="input-field"
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">{errors.lastName}</span>
              )}

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="country"
                className="input-field"
              />
              {errors.country && (
                <span className="text-sm text-red-500">{errors.country}</span>
              )}

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="state"
                className="input-field"
              />
              {errors.state && (
                <span className="text-sm text-red-500">{errors.state}</span>
              )}

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="address"
                className="input-field"
              />
              {errors.address && (
                <span className="text-sm text-red-500">{errors.address}</span>
              )}

              <div className="gap-4 justify-between flex w-full">
                <div className="flex flex-col flex-1 gap-1">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="city"
                    className="input-field"
                  />
                  {errors.city && (
                    <span className="text-sm text-red-500">{errors.city}</span>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="postal code"
                    className="input-field"
                  />
                  {errors.postalCode && (
                    <span className="text-sm text-red-500">
                      {errors.postalCode}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary mt-4 self-center">
                Continue to Shipping
              </button>
            </form>
          )}

          {step === "shipping" && (
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-xl font-extrabold uppercase text-(--text-color)">
                Shipping Method
              </h2>
              <p className="text-sm text-(--grey-color)">Standard — Free</p>
              <p className="text-sm text-(--grey-color)">
                Express — ${shippingCost}
              </p>
              <button
                type="button"
                onClick={() => setStep("payment")}
                className="btn-primary mt-4 self-center"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <form
              onSubmit={handlePaymentSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <h2 className="text-xl font-extrabold uppercase text-(--text-color)">
                Payment
              </h2>

              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className="input-field"
              />
              {errors.cardNumber && (
                <span className="text-sm text-red-500">
                  {errors.cardNumber}
                </span>
              )}

              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                placeholder="Name on Card"
                className="input-field"
              />
              {errors.nameOnCard && (
                <span className="text-sm text-red-500">
                  {errors.nameOnCard}
                </span>
              )}

              <div className="flex gap-4 w-full">
                <div className="flex flex-col flex-1 gap-1">
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="input-field"
                  />
                  {errors.expiry && (
                    <span className="text-sm text-red-500">
                      {errors.expiry}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className="input-field"
                  />
                  {errors.cvv && (
                    <span className="text-sm text-red-500">{errors.cvv}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary mt-4 self-center">
                Place Order
              </button>
            </form>
          )}
        </section>
        {order && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" />
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white rounded-xl p-10 z-50
                    flex flex-col items-center gap-6 w-md"
            >
              <h2 className="text-2xl font-extrabold text-green-600">
                Order Placed Successfully!
              </h2>
              <h3>
                {formData.firstName} {formData.lastName},
              </h3>
              <p className="text-sm text-(--grey-color) text-center">
                Thank you for choosing us. Your order has been placed and will
                be delivered to you soon.
              </p>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between text-sm text-(--grey-color)">
                  <span>Total Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-sm text-(--grey-color)">
                  <span>Shipping</span>
                  <span>${shippingCost}</span>
                </div>
                <div className="flex justify-between font-extrabold text-(--text-color) border-t border-(--grey-color) pt-3">
                  <span>Total Paid</span>
                  <span>${total + shippingCost}</span>
                </div>
              </div>

              <RouterLink to="/home" className="btn-primary text-center w-full">
                Continue Shopping
              </RouterLink>
            </div>
          </>
        )}

        {/* right */}
        <section className="flex flex-1 h-full border rounded-lg bg-(--secondary-color) flex-col">
          <div className="px-10 py-10">
            <h2 className="text-lg font-extrabold uppercase text-(--text-color) mb-10">
              Your Order
            </h2>
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-8 border-b border-(--grey-color) pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="text-sm font-medium text-(--text-color)">
                      {item.name}
                    </p>
                    <p className="text-sm text-(--grey-color)">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-sm text-(--grey-color)">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-(--text-color)">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-(--grey-color) pt-4 px-10 py-6">
            <div className="flex justify-between text-sm text-(--text-color)">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-sm text-(--grey-color)">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between font-extrabold text-(--text-color) border-t border-(--grey-color) pt-4">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
