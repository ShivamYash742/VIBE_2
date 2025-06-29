import { useState } from "react";
import { useGame, StoreItem, ItemCategory } from "../contexts/GameContext";
import { ShoppingBag, Coins, Check, AlertCircle } from "lucide-react";

const StoreItemCard = ({ item }: { item: StoreItem }) => {
  const { currency, purchaseItem } = useGame();
  const [showConfirm, setShowConfirm] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handlePurchase = () => {
    if (item.owned) return;

    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    const success = purchaseItem(item.id);

    if (success) {
      setPurchaseStatus("success");
      setTimeout(() => {
        setPurchaseStatus("idle");
        setShowConfirm(false);
      }, 2000);
    } else {
      setPurchaseStatus("error");
      setTimeout(() => {
        setPurchaseStatus("idle");
        setShowConfirm(false);
      }, 2000);
    }
  };

  const getCategoryColor = (category: ItemCategory) => {
    switch (category) {
      case "avatar":
        return "text-neon-blue";
      case "theme":
        return "text-neon-purple";
      case "badge":
        return "text-neon-pink";
      case "certificate":
        return "text-neon-teal";
      default:
        return "text-white";
    }
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-accent/80 text-xs font-medium">
          {item.category}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold text-white mb-1">{item.name}</h4>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Coins className={`h-4 w-4 ${getCategoryColor(item.category)}`} />
            <span className="font-medium">{item.price}</span>
          </div>

          {item.owned ? (
            <span className="px-3 py-1.5 bg-accent/40 rounded-lg text-white text-sm font-medium flex items-center gap-1">
              <Check className="h-4 w-4" />
              Owned
            </span>
          ) : showConfirm ? (
            <div className="flex items-center gap-1">
              {purchaseStatus === "idle" ? (
                <>
                  <button
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1.5 bg-neon-purple rounded-lg text-white text-sm font-medium hover:bg-neon-purple/90 transition-colors"
                    onClick={handlePurchase}
                    disabled={currency < item.price}
                  >
                    Confirm
                  </button>
                </>
              ) : purchaseStatus === "success" ? (
                <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Purchased!
                </span>
              ) : (
                <span className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Not enough coins
                </span>
              )}
            </div>
          ) : (
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                currency >= item.price
                  ? "bg-neon-purple text-white hover:bg-neon-purple/90"
                  : "bg-accent/40 text-muted-foreground cursor-not-allowed"
              }`}
              onClick={handlePurchase}
              disabled={currency < item.price}
            >
              <ShoppingBag className="h-4 w-4" />
              {currency >= item.price ? "Purchase" : "Not enough"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Store = () => {
  const { storeItems, currency } = useGame();
  const [activeCategory, setActiveCategory] = useState<ItemCategory | "all">(
    "all"
  );

  // Filter items by category
  const filteredItems =
    activeCategory === "all"
      ? storeItems
      : storeItems.filter((item) => item.category === activeCategory);

  // Get all unique categories
  const categories: (ItemCategory | "all")[] = [
    "all",
    ...new Set(storeItems.map((item) => item.category)),
  ];

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-white">Store</h3>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/40">
              <Coins className="h-4 w-4 text-neon-purple" />
              <span className="font-medium">{currency}</span>
            </div>
          </div>

          <div className="flex bg-accent/30 rounded-lg p-1 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "text-muted-foreground hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <StoreItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No items available in this category
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            Earn coins by completing quizzes and missions. Use your coins to
            purchase avatars, themes, badges, and certificates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Store;
