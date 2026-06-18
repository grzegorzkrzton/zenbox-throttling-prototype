import { useState, useEffect, useRef, useCallback } from 'react';
import { Agentation } from 'agentation';
import Header from './components/Header';
import { PrimarySidebar, SecondarySidebar } from './components/Sidebar';
import TicketList, { tickets } from './components/TicketList';
import ConversationPanel from './components/ConversationPanel';
import ResizableLayout from './components/ResizableLayout';
import AdminCenterPage from './components/AdminCenterPage';
import WFMPage from './components/WFMPage';
import TicketDetailPage from './components/TicketDetailPage';
import PageTransition from './components/PageTransition';
import TopBar from './components/TopBar/TopBar';
import Widgets from './components/Widgets/Widgets';
import { AdminCenterProductIcon, SupportProductIcon, WFMProductIcon } from './components/Icons';
import { useTheme } from './contexts';
import './App.css';

const products = [
  { id: 'workforce', name: 'Workforce management', icon: WFMProductIcon },
  { id: 'support', name: 'Support', icon: SupportProductIcon, current: true },
  { id: 'admin', name: 'Admin center', icon: AdminCenterProductIcon },
];

const getTicketKey = (ticket) => `${ticket.id}__${ticket.title}`;

function NavPanel({ onToggleNav, isNavCollapsed }) {
  return (
    <div className="nav-panel">
      <div className="nav-panel__content">
        <PrimarySidebar isNavCollapsed={isNavCollapsed} onToggleNav={onToggleNav} />
        {!isNavCollapsed && <SecondarySidebar onToggle={onToggleNav} />}
      </div>
    </div>
  );
}

function MainContent({ selectedTicket, onSelectTicket, onCloseConversation, onStatusChange, currentTicketIndex, onPrevTicket, onNextTicket }) {
  return (
    <div className={`main-content ${selectedTicket ? 'main-content--with-conversation' : ''}`}>
      <div className={`main-content__ticket-list ${selectedTicket ? 'main-content__ticket-list--narrow' : ''}`}>
        <TicketList selectedTicket={selectedTicket} onSelectTicket={onSelectTicket} />
      </div>
      {selectedTicket ? (
        <div className="main-content__conversation">
          <ConversationPanel 
            ticket={selectedTicket} 
            onClose={onCloseConversation}
            onStatusChange={onStatusChange}
            currentIndex={currentTicketIndex}
            totalTickets={tickets.length}
            onPrevTicket={onPrevTicket}
            onNextTicket={onNextTicket}
          />
        </div>
      ) : (
        <div className="main-content__widgets">
          <Widgets />
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    products.find((p) => p.id === 'admin')
  );
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openTicketTabs, setOpenTicketTabs] = useState([]);
  const { setCurrentProduct } = useTheme();

  // Initialize current product on mount and sync when selectedProduct changes
  useEffect(() => {
    setCurrentProduct(selectedProduct?.id || 'support');
  }, [selectedProduct, setCurrentProduct]);

  const handleProductChange = (product) => {
    if (product.id !== 'admin') return;
    setSelectedProduct(product);
    setCurrentProduct(product.id);
    setSelectedTicket(null);
  };

  const handleSelectTicket = useCallback((ticket) => {
    setOpenTicketTabs(prev => {
      const alreadyOpen = prev.some(t => getTicketKey(t) === getTicketKey(ticket));
      return alreadyOpen ? prev : [...prev, ticket];
    });
    setSelectedTicket(ticket);
  }, []);

  const handleCloseActionPanel = useCallback(() => {
    setSelectedTicket(null);
  }, []);

  const handleTicketTabClick = useCallback((ticket) => {
    setSelectedTicket(ticket);
  }, []);

  const handleTicketTabClose = useCallback((ticket) => {
    setOpenTicketTabs(prev => prev.filter(t => getTicketKey(t) !== getTicketKey(ticket)));
    setSelectedTicket(prev => prev && getTicketKey(prev) === getTicketKey(ticket) ? null : prev);
  }, []);

  const handleStatusChange = useCallback((newStatus) => {
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  }, [selectedTicket]);

  // Calculate current ticket index
  const currentTicketIndex = selectedTicket 
    ? tickets.findIndex(t => t.id === selectedTicket.id && t.title === selectedTicket.title)
    : -1;

  const handlePrevTicket = useCallback(() => {
    if (currentTicketIndex > 0) {
      setSelectedTicket(tickets[currentTicketIndex - 1]);
    }
  }, [currentTicketIndex]);

  const handleNextTicket = useCallback(() => {
    if (currentTicketIndex < tickets.length - 1) {
      setSelectedTicket(tickets[currentTicketIndex + 1]);
    }
  }, [currentTicketIndex]);

  // Determine which page to render
  const isAdminPage = selectedProduct?.id === 'admin';
  const isWFMPage = selectedProduct?.id === 'workforce';
  const pageKey = selectedProduct?.id || 'support';

  const renderPageContent = () => {
    if (isAdminPage) {
      return (
        <AdminCenterPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
        />
      );
    }

    if (isWFMPage) {
      return (
        <WFMPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
        />
      );
    }

    if (selectedTicket) {
      return (
        <TicketDetailPage
          ticket={selectedTicket}
          onBack={handleCloseActionPanel}
          onNavigateHome={handleCloseActionPanel}
          onProductChange={handleProductChange}
          selectedProduct={selectedProduct}
          products={products}
          onStatusChange={handleStatusChange}
          currentTicketIndex={currentTicketIndex}
          totalTickets={tickets.length}
          onPrevTicket={handlePrevTicket}
          onNextTicket={handleNextTicket}
          openTicketTabs={openTicketTabs}
          onTicketTabClick={handleTicketTabClick}
          onTicketTabClose={handleTicketTabClose}
        />
      );
    }

    return (
      <div className="support-page">
        <TopBar
          selectedProduct={selectedProduct}
          products={products}
          onProductChange={handleProductChange}
          openTicketTabs={openTicketTabs}
          selectedTicket={selectedTicket}
          onTicketTabClick={handleTicketTabClick}
          onTicketTabClose={handleTicketTabClose}
        />
        <ResizableLayout
          navPanel={<NavPanel />}
          mainContent={
            <MainContent 
              selectedTicket={selectedTicket} 
              onSelectTicket={handleSelectTicket} 
              onCloseConversation={handleCloseActionPanel} 
              onStatusChange={handleStatusChange}
              currentTicketIndex={currentTicketIndex}
              onPrevTicket={handlePrevTicket}
              onNextTicket={handleNextTicket}
            />
          }
        />
      </div>
    );
  };

  return (
    <div className="app">
      <PageTransition pageKey={pageKey}>
        {renderPageContent()}
      </PageTransition>
      
      <Agentation />
    </div>
  );
}

export default App;
