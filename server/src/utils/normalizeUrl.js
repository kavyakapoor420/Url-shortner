const normalizeUrl = (value) => {
  const trimmedValue = value.trim();
  const urlWithProtocol = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  return new URL(urlWithProtocol).toString();
};

export default normalizeUrl;
