import { useState } from 'react';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import { Field, Label, Checkbox, Hint, Radio, Fieldset } from '@zendeskgarden/react-forms';
import TopBar from '../TopBar/TopBar';
import ChannelConfig from './ChannelConfig';
import CapacityGraphModal from './CapacityGraphModal';
import RampUpTimeoutField from './RampUpTimeoutField';
import {
  DEFAULT_WORKLOAD_PACING_STATE,
  isWorkloadPacingValid,
} from './workload-pacing';
import './RoutingConfigPage.css';

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return <span className={className} aria-hidden="true" />;
}

export default function RoutingConfigPage({
  navColumn,
  selectedProduct,
  products,
  onProductChange,
  isNavCollapsed = false,
  onNavigateToQueues,
}) {
  const [assignmentMethod, setAssignmentMethod] = useState('reassign-through-queues');
  const [workloadPacing, setWorkloadPacing] = useState(DEFAULT_WORKLOAD_PACING_STATE);
  const [showModal, setShowModal] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [messagingValid, setMessagingValid] = useState(true);
  const [timeoutValid, setTimeoutValid] = useState(true);

  const canGenerateGraph =
    isWorkloadPacingValid(workloadPacing) &&
    (!workloadPacing.email.enabled || emailValid) &&
    (!workloadPacing.messaging.enabled || messagingValid) &&
    timeoutValid;

  const handleSave = () => {
    // Prototype: no persistence
  };

  return (
    <div className="routing-config-page">
      <TopBar
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="routing-config-page__body">
        {navColumn}

        <div className="routing-config-page__content-column">
          <main className="routing-config-page__main">
            <div className="routing-config-page__content">
              <div className="routing-config-breadcrumbs">
                <Anchor href="#" className="routing-config-breadcrumbs__link">Objects and rules</Anchor>
                <ChevronRightIcon className="routing-config-breadcrumbs__separator" />
                <Anchor href="#" className="routing-config-breadcrumbs__link">Omnichannel routing</Anchor>
                <ChevronRightIcon className="routing-config-breadcrumbs__separator" />
                <span className="routing-config-breadcrumbs__current">Routing configurations</span>
              </div>

              <div className="routing-config-page-header">
                <h1 className="routing-config-page-header__title">Initial routing configuration</h1>
                <p className="routing-config-page-header__description">
                  Edit the routing configuration to determine how work is distributed to team members.{' '}
                  <Anchor href="#" isExternal>
                    Learn about routing configurations
                    <ExternalLinkIcon />
                  </Anchor>
                </p>
              </div>

              <section className="routing-config-section">
                <div className="routing-config-section__header">
                  <h2 className="routing-config-section__title">Global routing</h2>
                  <p className="routing-config-section__description">
                    Select how to route and assign incoming tickets to agents.
                  </p>
                </div>

                <section className="routing-config-section" style={{ paddingTop: 0, borderTop: 'none' }}>
                  <div className="routing-config-section__header">
                    <h3 className="routing-config-section__title">Assignment method</h3>
                    <p className="routing-config-section__description">
                      Choose how tickets are assigned when agents become available.
                    </p>
                  </div>

                  <Fieldset>
                    <div className="routing-config-section__radios">
                      <Field>
                        <Radio
                          name="assignment-method"
                          value="direct"
                          checked={assignmentMethod === 'direct'}
                          onChange={() => setAssignmentMethod('direct')}
                        >
                          <Label>Assign tickets directly to agents</Label>
                        </Radio>
                      </Field>
                      <Field>
                        <Radio
                          name="assignment-method"
                          value="reassign-through-queues"
                          checked={assignmentMethod === 'reassign-through-queues'}
                          onChange={() => setAssignmentMethod('reassign-through-queues')}
                        >
                          <Label>Reassign tickets through queues</Label>
                        </Radio>
                      </Field>
                    </div>
                  </Fieldset>
                </section>

                <section className="routing-config-section" style={{ paddingTop: '24px', borderTop: 'none' }}>
                  <div className="routing-config-section__header">
                    <h3 className="routing-config-section__title">Workload ramp-up</h3>
                    <p className="routing-config-section__description">
                      Gradually increase agent capacity when they sign in for the first time each day.
                    </p>
                  </div>

                  <div className="routing-config-section__panel">
                    <Field>
                      <Checkbox
                        checked={workloadPacing.featureEnabled}
                        onChange={(e) =>
                          setWorkloadPacing({ ...workloadPacing, featureEnabled: e.target.checked })
                        }
                      >
                        <Label isRegular={false}>Workload ramp-up</Label>
                      </Checkbox>
                      <Hint className="routing-config-section__channel-hint">
                        Gradually pace assignments when an agent signs in for the first time each day.
                        Set an initial capacity and ramp-up duration.
                      </Hint>
                    </Field>

                    {workloadPacing.featureEnabled && (
                      <>
                        <RampUpTimeoutField
                          minutes={workloadPacing.rampUpTimeout}
                          onChange={(rampUpTimeout) =>
                            setWorkloadPacing({ ...workloadPacing, rampUpTimeout })
                          }
                          onValidityChange={setTimeoutValid}
                        />

                        <div className="routing-config-section__channel-block">
                          <Field>
                            <Checkbox
                              checked={workloadPacing.email.enabled}
                              onChange={(e) =>
                                setWorkloadPacing({
                                  ...workloadPacing,
                                  email: { ...workloadPacing.email, enabled: e.target.checked },
                                })
                              }
                            >
                              <Label isRegular={false}>Email</Label>
                            </Checkbox>
                            <Hint className="routing-config-section__channel-hint">
                              Email, web form, API, side conversation, and SMS
                            </Hint>
                          </Field>
                          {workloadPacing.email.enabled && (
                            <ChannelConfig
                              config={workloadPacing.email}
                              onChange={(email) => setWorkloadPacing({ ...workloadPacing, email })}
                              onValidityChange={setEmailValid}
                            />
                          )}
                        </div>

                        <div className="routing-config-section__channel-block">
                          <Field>
                            <Checkbox
                              checked={workloadPacing.messaging.enabled}
                              onChange={(e) =>
                                setWorkloadPacing({
                                  ...workloadPacing,
                                  messaging: { ...workloadPacing.messaging, enabled: e.target.checked },
                                })
                              }
                            >
                              <Label isRegular={false}>Messaging</Label>
                            </Checkbox>
                            <Hint className="routing-config-section__channel-hint">
                              Social media and native messages
                            </Hint>
                          </Field>
                          {workloadPacing.messaging.enabled && (
                            <ChannelConfig
                              config={workloadPacing.messaging}
                              onChange={(messaging) =>
                                setWorkloadPacing({ ...workloadPacing, messaging })
                              }
                              onValidityChange={setMessagingValid}
                            />
                          )}
                        </div>

                        <div className="routing-config-section__graph-action">
                          <Button
                            isPrimary
                            disabled={!canGenerateGraph}
                            onClick={() => setShowModal(true)}
                          >
                            Generate graph
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </section>
            </div>

            <div className="routing-config-page__footer">
              <div className="routing-config-page__footer-actions">
                <Button isBasic onClick={onNavigateToQueues}>Cancel</Button>
                <Button isPrimary onClick={handleSave}>Save</Button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showModal && (
        <CapacityGraphModal
          email={workloadPacing.email}
          messaging={workloadPacing.messaging}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
