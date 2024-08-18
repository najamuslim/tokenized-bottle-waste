import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

interface WalletContextProps {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  defaultAccount: string;
  balance: string;
  openMenu: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [defaultAccount, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [openMenu, setOpenMenu] = useState("not-f");
  const router = useRouter();

  const connectWallet = async () => {
    const isMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      return /android|iphone|ipad|iPod/i.test(userAgent);
    };

    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await web3Provider.send("eth_requestAccounts", []);
      const signer = web3Provider.getSigner();
      const defaultAccount = await signer.getAddress();
      const balance = await signer.getBalance();
      try {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x106a" }],
        });
      } catch (error) {
        console.log("failed switch network");
      }

      setProvider(web3Provider);
      setSigner(signer);
      setAddress(defaultAccount);
      setBalance(ethers.utils.formatEther(balance));
    } else {
      console.error("No Ethereum provider found");
      const url = isMobile()
        ? "https://metamask.app.link/download.html"
        : "https://metamask.io/download.html";
      window.open(url, "_blank");
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress("");
    setBalance("");
  };

  useEffect(() => {
    const initConnection = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await web3Provider.listAccounts();

        if (accounts.length > 0) {
          const signer = web3Provider.getSigner();
          const defaultAccount = await signer.getAddress();
          const balance = await signer.getBalance();

          setProvider(web3Provider);
          setSigner(signer);
          setAddress(defaultAccount);
          setBalance(ethers.utils.formatEther(balance));
          setOpenMenu("on-naf");
        }
      }
    };

    initConnection();

    window.ethereum?.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length > 0) {
        const defaultAccount = accounts[0];
        setAddress(defaultAccount);
        if (provider) {
          const balance = await provider.getBalance(defaultAccount);
          setBalance(ethers.utils.formatEther(balance));
        }
      } else {
        disconnectWallet();
      }
    });

    window.ethereum?.on("chainChanged", () => {
      window.location.reload();
    });

    return () => {
      window.ethereum?.removeAllListeners();
    };
  }, [provider]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        defaultAccount,
        balance,
        openMenu,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
